pipeline {
    agent any

    environment {
        GIT_URL = 'https://github.com/TiagoLuz9292/online_marketplace.git'
    }

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'itt', 'uat', 'prod'], description: 'Select the deployment environment')
        string(name: 'APPLICATION_VERSION', defaultValue: 'main', description: 'Version Tag')
    }

    stages {
        stage('Fetch Tags') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'github', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {

                        // Remove the repo directory if it exists
                        sh 'rm -rf repo'

                        // Clone the repository to list tags
                        sh "git clone https://${env.GIT_USERNAME}:${env.GIT_PASSWORD}@github.com/TiagoLuz9292/online_marketplace.git repo"
                        // List tags and store them in a variable
                        def tags = sh(script: 'cd repo && git tag', returnStdout: true).trim().split("\n")

                        // Add tags to the parameters for the next stages
                        def tagParameterDefinition = new hudson.model.ChoiceParameterDefinition(
                            'APPLICATION_VERSION', 
                            tags as String[], 
                            'Choose a tag to deploy'
                        )
                        currentBuild.getProject().addProperty(
                            new hudson.model.ParametersDefinitionProperty(tagParameterDefinition)
                        )
                    }
                }
            }
        }
        stage('Deploy') {
            when {
                expression { params.APPLICATION_VERSION != 'main' }
            }
            steps {
                echo "Deploying version ${params.APPLICATION_VERSION} to ${params.ENVIRONMENT} environment"
                // Add your deployment steps here
            }
        }
    }
}
