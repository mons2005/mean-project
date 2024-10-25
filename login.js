<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
    <style>
        .login-container {
            width: 300px;
            margin: 50px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .message {
            color: red;
        }
    </style>
</head>
<body ng-app="loginApp" ng-controller="LoginController">

    <div class="login-container">
        <h2>Login</h2>
        <form ng-submit="handleSubmit()">
            <div>
                <label>Email Address</label>
                <input type="email" placeholder="Enter email" ng-model="email" required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" placeholder="Password" ng-model="password" required />
            </div>
            <button type="submit" ng-disabled="loading">
                {{ loading ? 'Logging in...' : 'Submit' }}
            </button>
            <p class="message" ng-if="message">{{ message }}</p>
        </form>
        <p>
            Don't have an account? 
            <a href="#sign-up" ng-click="handleSectionClick('SignUp')">Sign Up</a>
        </p>
    </div>

    <script>
        var app = angular.module('loginApp', []);

        app.controller('LoginController', function($scope, $http) {
            $scope.email = '';
            $scope.password = '';
            $scope.message = '';
            $scope.loading = false;

            $scope.handleSubmit = async function() {
                $scope.message = ''; // Clear previous messages

                if ($scope.email && $scope.password) {
                    $scope.loading = true; // Start loading
                    try {
                        const response = await $http.post('http://localhost:5000/login', {
                            email: $scope.email,
                            password: $scope.password
                        });

                        if (response.status !== 200) {
                            $scope.message = response.data; // Set error message from server
                            return;
                        }

                        $scope.message = response.data; // Successful login message
                        $scope.handleSectionClick('Home'); // Navigate to Home after successful login
                    } catch (error) {
                        console.error('Login error:', error);
                        $scope.message = 'An error occurred during login. Please try again.';
                    } finally {
                        $scope.loading = false; // End loading
                    }
                } else {
                    $scope.message = 'Please enter your email and password.';
                }
            };

            $scope.handleSectionClick = function(section) {
                // Logic to handle section click (e.g., navigate to the specified section)
                console.log('Navigating to:', section);
            };
        });
    </script>
</body>
</html>
