from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
import hashlib
from flask_jwt_extended import JWTManager, create_access_token
import os
from dotenv import load_dotenv
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from bson import json_util
from pmdarima.arima import auto_arima
import pandas as pd
import warnings
from math import sqrt
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error
import datetime
from bson.objectid import ObjectId  


# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    # Use an environment variable for the JWT secret key
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET', 'mytoken')
    jwt = JWTManager(app)
    CORS(app)

    # Retrieve MongoDB URL from environment variables
    mongo_url = os.getenv('MONGO_URL')
    if not mongo_url:
        raise EnvironmentError("MONGO_URL not found in environment variables.")

    try:
        client = MongoClient(mongo_url, serverSelectionTimeoutMS=5000)
        client.server_info()  # Attempt to connect and force a server call
        db = client.get_default_database()  # Get the default database
        app.logger.info("Successfully connected to MongoDB")
    except ServerSelectionTimeoutError as e:
        app.logger.error("Database connection failed.", exc_info=True)
        raise e

    # Function to predict sales using moving average
    def predict_sales(historical_data):
        sales = np.array([data['sales'] for data in historical_data])
        
        if len(sales.shape) == 0:
            sales = sales.reshape(-1)
        
            
        '''stepwise_model = auto_arima(sales, start_p=1, start_q=1,
                                 max_p=3, max_q=3, seasonal=False, 
                                 d=None, trace=True,
                                 error_action='ignore',  
                                 suppress_warnings=True, 
                                 stepwise=True)
    
        model_fit = stepwise_model.fit(sales)'''
        
        model = ARIMA(sales, order=(1,1,1))
        model_fit = model.fit()
        predicted_sales = model_fit.forecast(steps=5)
        
        
        return predicted_sales
    
    def forecast(series,order):
        # Fit the model
        model = ARIMA(series, order=order)
        model_fit = model.fit()

        # Generate predictions for the next 5 occurrences
        forecast = model_fit.forecast(steps=5) 
        predicted_sales = forecast.to_numpy()
        
        return predicted_sales
    
    def evaluate_arima_model(X, arima_order):
        # prepare training dataset
        train_size = int(len(X) * 0.66)
        train, test = X[0:train_size], X[train_size:]
        history = [x for x in train]

        # make predictions
        predictions = list()
        for t in range(len(test)):
            model = ARIMA(history, order=arima_order)  # Indentation fixed here
            model_fit = model.fit()
            yhat = model_fit.forecast()[0]
            predictions.append(yhat)
            history.append(test[t])

        # calculate out of sample error
        #rmse = sqrt(mean_squared_error(test, predictions))
        mse = mean_squared_error(test, predictions)
        return mse

# ... previous code ...
    
    def evaluate_models(dataset, p_values, d_values, q_values):

        dataset = dataset.astype('float32')
        best_score, best_cfg = float("inf"), None
        # ... other parts of the function ...

        for p in p_values:
            for d in d_values:  # Indentation fixed
                for q in q_values:
                    # Code to be executed inside the loops
                    order = (p, d, q)
                    print(p,d,q)
                    try:
                        #rmse = evaluate_arima_model(dataset, order)
                        mse = evaluate_arima_model(dataset, order)
                        if mse < best_score:
                            best_score, best_cfg = mse, order
                            print('ARIMA%s MSE=%.3f' % (order,mse))
                        # ... rest of your code ...
                    except:
                        continue
        print('Best ARIMA%s MSE=%.3f' % (best_cfg, best_score))
        return order

    @app.route('/test_db_connection')
    def test_db_connection():
        return jsonify(message="Successfully connected to the database."), 200

    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')  # No need to encode password
        if not email or not password:
            return jsonify({"error": "Missing email or password"}), 400

        user_collection = db['users']
        user = user_collection.find_one({"email": email, "password": password})  # Check if user exists with provided email and password
        if user:
            access_token = create_access_token(identity=str(user['_id']))
            return jsonify(access_token=access_token, name=user['name']), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401

    @app.route('/fetch_chart_data', methods=['GET'])
    def fetch_chart_data():
        country = request.args.get('country')
        product_id = request.args.get('product_id')
        
        #products_collection = db['products']
        # Query parameters
        collection = db["imports"]
        #country = "United Kingdom"
        #product_id = "08011100"
        product_name = "desicated_coconut"
        
        
        # Retrieve historical sales data
        #historical_data = list(products_collection.find({"country": country, "product_id": product_id}))
        
        
        # Build the query filter
        filter = {"country": country, "productCode": product_id}
        
        # Retrieve historical sales data
        #historical_data = list(products_collection.find({"country": country, "product_id": product_id}))
        # Find matching documents and create the data array
        data = []
        cursor = collection.find(filter)

        for document in cursor:  # Iterate over documents
            for record in document['imports']:  # Iterate over the "imports" array
                data.append({
                    'date': datetime.date(record['year'], record['month'], 1),
                    'sales': record['sales']
                })
                
        historical_data = []
        for entry in data:
            historical_data.append({
                '_id': ObjectId(),  # Generate new ObjectIds  
                'country': country,
                'product_id': product_id,
                'product_name': product_name,
                'year': entry['date'].year,
                'month': entry['date'].strftime('%B'),  # Get the month name
                'sales': entry['sales']
            })
                
        # Create the DataFrame
        series = pd.DataFrame(data)

        # Convert 'date' column to DatetimeIndex 
        series['date'] = pd.to_datetime(series['date']) 

        # Set the 'date' column as the index
        series.set_index('date', inplace=True)

        series.index = series.index.to_period('M')
        
        print(series)
        print(type(series))
        
        # evaluate parameters
        p_values = [0, 1, 2, 4, 6, 8, 10]
        d_values = range(0, 3)
        q_values = range(0, 3)

        warnings.filterwarnings("ignore")
        #order = evaluate_models(series.values, p_values, d_values, q_values)
        #order = (8, 0, 1)
        
        if document and "order" in document: 
            is_empty = document["order"]["tuple_is_empty"]  # Output: (2, 0, 1)
            if is_empty:
                my_tuple = document["order"]["my_tuple"]
                print(my_tuple)
                order = tuple(my_tuple)
                print(order) 
            else:
                p_values = [0, 1, 2, 4, 6, 8, 10]
                d_values = range(0, 3)
                q_values = range(0, 3)

                warnings.filterwarnings("ignore")
                order = evaluate_models(series.values, p_values, d_values, q_values)
                if order is None:
                    order = (0,0,0)
                    new_tuple = order
                    collection.update_one(filter, 
                                        {"$set": {"order.my_tuple": list(new_tuple),
                                                    "order.tuple_is_empty": False
                                        }})
                else:
                    new_tuple = order
                    collection.update_one(filter, 
                                            {"$set": {"order.my_tuple": list(new_tuple),
                                                        "order.tuple_is_empty": True
                                            }}) 
        else:
            print("Document not found or 'order' field missing") 
 
        
             
        
        predicted_sales_df = forecast(series,order)
        predicted_sales = predicted_sales_df
        print(predicted_sales)   
        print(type(predicted_sales))
        
        # Perform prediction for the next 5 months using ARIMA
        predicted_sales = forecast(series,order)

                
        # Combine historical data with predictions
        combined_data = combine_data(historical_data, predicted_sales)
        
        # Convert combined_data to JSON using json_util
        json_data = json_util.dumps(combined_data)
        
        return json_data, 200, {'Content-Type': 'application/json'}


    def combine_data(historical_data, predicted_sales):
        # Combine historical data with predictions
        combined_data = []
        for data in historical_data:
            # Convert ObjectId to string
            data['_id'] = str(data['_id'])
            combined_data.append(data)

        # Add predictions to the combined data
        for idx, data in enumerate(combined_data):
            data['prediction'] = predicted_sales[idx] if idx < len(predicted_sales) else None

        return combined_data

    @app.route('/register', methods=['POST'])
    def register():
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        password = data.get('password')
        if not name or not email or not phone or not password:
            return jsonify({"error": "Missing fields"}), 400

        user_collection = db['users']
        if user_collection.find_one({"email": email}):
            return jsonify({"error": "Email already registered"}), 400

        user_id = user_collection.insert_one({
            "name": name,
            "email": email,
            "phone": phone,
            "password": password,  # Store the password as provided
            "role": "user",
            "status": "pending"
        }).inserted_id
        return jsonify({"message": "User registered successfully", "user_id": str(user_id)}), 201

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
