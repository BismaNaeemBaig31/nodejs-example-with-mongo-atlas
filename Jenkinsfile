pipeline {
    agent {
  label 'labk8z'
}
environment {
MONGO_URL = credentials('mongo-url')
}
  stages{
    stage('Git') {
        steps {
            git credentialsId: 'githubnew', url: 'https://github.com/BismaNaeemBaig31/nodejs-example-with-mongo-atlas.git'
        }
    }
    
    stage('Build step') {
        environment {
            DOCKER_CREDS= credentials('github_id')
            }
        steps {
            sh '''
            docker login -u $DOCKER_CREDS_USR -p $DOCKER_CREDS_PSW
            docker build . -t bismabaig/nodejs:$BUILD_ID -t bismabaig/nodejs:latest
            docker push bismabaig/nodejs:$BUILD_ID 
            docker push bismabaig/nodejs:latest
            env
            '''
        }
    }
    stage('Main Branch') {
    when {
        expression {
            return env.BRANCH_NAME == 'main'
        }
    }
    steps {
        script {
            docker build . -t bismabaig/nodejs:$BUILD_ID -t bismabaig/nodejs:prod-$BUILD_ID
        }
    }
}

    stage('Dev Branch') {
        when {
            expression {
                return env.BRANCH_NAME == 'dev'
            }
        }
        steps {
            script {
                docker build . -t bismabaig/nodejs:$BUILD_ID -t bismabaig/nodejs:dev-$BUILD_ID
            }

        }
    }

  } // end of stages
    post {
        always {
            slackSend channel: 'jenkins', color: 'good' , message: "${JOB_NAME} ${BUILD_DISPLAY_NAME} started ${MONGO_URL}"
        }
        success {
            slackSend channel: 'jenkins', color: 'good' ,  message: "${JOB_NAME} ${BUILD_DISPLAY_NAME} success"
        }
        failure {
            slackSend channel: 'jenkins', color: 'bad' , message: "${JOB_NAME} ${BUILD_DISPLAY_NAME} failure"
        }
        unstable {
            slackSend channel: 'jenkins', color: 'bad' ,  message: "${JOB_NAME} ${BUILD_DISPLAY_NAME} unstable"
        }
    }

} 
