Group_BSE24-32 Project
Project Description
This is a simple yet comprehensive project designed to demonstrate and implement best practices for Continuous Integration (CI), Continuous Deployment (CD), and production-level monitoring. The project provides a full-stack web application that simulates a real-world scenario, incorporating Django for the backend and frontend setup React.

The main objective of this project is to enable developers and DevOps teams to understand and practice the key aspects of software delivery pipelines on a web application, including:

Setting Up Continuous Integration (CI): Automating the testing and integration of code through CI tools.
Continuous Deployment to Staging: Deploying to a staging environment for testing and verification before production.
Production Deployment and Monitoring: Deploying the application to production and monitoring performance, security, and uptime.
Installation
Follow these steps to set up the project locally:

Clone the repository: git clone https://github.com/MukiibiVictor/Group_BSE24-32.git
Navigate to the project directory: cd repository-name
Create and activate a virtual environment:For Windows(cmd) =>(CREATE)=> python -m venv env =>(ACTIVATE)=> env\Scripts\activate, For Windows(cmd) => source env/bin/activate
Install dependencies : pip install -r requirements.txt
Run migrations: python manage.py migrate
Start Django Development Server: python manage.py runserver
Project Setup
Initialize a Git repository: git init
Set up remote on GitHub: git remote add origin https://github.com/yourusername/Group_BSE24-X.git
Features of the web application
User authentication (Sign up, login)
Product display, shopping cart, order checkout, and payment forms.
Responsive design
Dark mode
Contributing
Contributions are welcome! Follow these steps to contribute:

Fork the repository.
Create a new branch: git checkout -b feature/your-feature-name
Commit your changes: git commit -m 'Add feature'
Push to the branch: git push origin feature/your-feature-name
Submit a pull request.
