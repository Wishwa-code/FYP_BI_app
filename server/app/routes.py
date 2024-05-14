# app/routes.py

def init_routes(app):

    @app.route('/')
    def home():
        return "Welcome to the Flask app!"
