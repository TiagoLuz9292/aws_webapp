pipeline {
    agent any

    environment {
        GIT_URL = 'https://github.com/TiagoLuz9292/online_marketplace.git'
        CREDENTIALS_ID = 'github' // replace with your credentials ID
    }

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'itt', 'uat', 'prod'], description: 'Select the deployment environment')
        // Add a placeholder for the APPLICATION_VERSION which will be updated in the script section
        choice(name: 'APPLICATION_VERSION', choices: [''], description: 'Version Tag')
    }

    stages {
        stage('Fetch Tags') {
            steps {
                script {
                    // Clone the repository to list tags
                    withCredentials([usernamePassword(credentialsId: env.CREDENTIALS_ID, passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                        def tags = sh(script: "git ls-remote --tags https://${GIT_USERNAME}:${GIT_PASSWORD}@${GIT_URL}", returnStdout: true).trim().readLines().collect { it.split()[1].replaceAll('refs/tags/', '') }
                        // Update the parameter with the fetched tags
                        def job = Jenkins.instance.getItem(env.JOB_NAME)
                        def paramDefinition = new hudson.model.ChoiceParameterDefinition('APPLICATION_VERSION', tags as String[], 'Choose a tag to deploy')
                        def paramProperty = new hudson.model.ParametersDefinitionProperty(paramDefinition)
                        job.removeProperty(hudson.model.ParametersDefinitionProperty)
                        job.addProperty(paramProperty)
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo "Deploying version ${params.APPLICATION_VERSION} to ${params.ENVIRONMENT} environment"
                    // Add your deployment steps here
                }
            }
        }
    }
}