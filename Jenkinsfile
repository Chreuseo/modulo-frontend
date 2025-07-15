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

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScannerCLI'

                    withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                        withSonarQubeEnv('SonarQube') {
                            sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=modulo -Dsonar.login=squ_70eeacfcdd8b2b9803a829690844dd52d4485437"
                        }
                    }
                }
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
