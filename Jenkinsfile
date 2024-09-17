pipeline {
    agent any

    environment {
        NODE_VERSION = '14.x' // Specify the Node.js version to use
        TARGET_DIR = '/opt/modulo/frontend'
    }

    stages {

        stage('Install Dependencies') {
            steps {
                // Install project dependencies
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Build the Angular project
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Clean the target directory
                    sh "sudo rm -rf ${TARGET_DIR}/*"

                    // Copy built files to the target directory
                    sh "sudo cp -r dist/* ${TARGET_DIR}/"
                }
            }
        }
    }

    post {
        always {
            // Clean up any workspace files
            cleanWs()
        }
    }
}
