# Kubernetes Practice Lab: Deployment, Scaling, and ConfigMaps

This guide documents the successful deployment of a Node.js application to a Minikube cluster on Arch Linux.

## 1. Project Architecture

To ensure the Node.js server processes the HTML instead of just "sending" it, the files must be organized as follows:

```
prac_p2/
├── app.js             # Server logic & template engine
├── Dockerfile         # Container manifest
├── package.json       # Dependencies
└── public/            # Static Assets
    ├── index.html     # Template with {{PLACEHOLDERS}}
    └── style.css      # CSS styles
```

## 2. Why did it work after the ConfigMap?

You noticed that the placeholders {{MESSAGE}} and {{POD_NAME}} only started working correctly after the ConfigMap was applied. Here is the technical breakdown:

### A. The "Environment" Injection

In your code, you used process.env.APP_MESSAGE.

- Before ConfigMap: The variable APP_MESSAGE simply did not exist inside the Linux environment of the container.

- After ConfigMap: When you ran kubectl set env ... --from=configmap/rodrig-config, Kubernetes restarted your pods and "injected" that string into the container's memory. Node.js could then find it and perform the .replaceAll() function.

### B. The Pod Name (os.hostname)

The {{POD_NAME}} is unique to every container. By scaling to 3 replicas, Kubernetes gives each pod a unique ID (like rodrig-app-v7-7d8475bdb-fx88f). Node.js reads this ID directly from the container's internal hostname.

### C. Defeating the "Static Bug"

Previously, Express.js was finding index.html in the public/ folder and serving it automatically. This skipped your Javascript code entirely. By moving the CSS to a virtual path (/static), we forced Express to ignore the raw HTML and run your app.get('/') function instead.

## 3. Full Command Execution Flow

### Step 1: Prepare the Environment

sudo systemctl start docker
minikube start --driver=docker

### Step 2: Build and Push Image

#Build v7
docker build -t rodrigocasio/my-first-k8s-app:v7 .

#Push to Docker Hub
docker push rodrigocasio/my-first-k8s-app:v7


### Step 3: Kubernetes Deployment

#Create Deployment
kubectl create deployment rodrig-app-v7 --image=rodrigocasio/my-first-k8s-app:v7

#Create Service (NodePort)
kubectl expose deployment rodrig-app-v7 --type=NodePort --port=80 --target-port=8080 --name=rodrig-app-service


### Step 4: Configuration & Scaling

#Create the ConfigMap
kubectl create configmap rodrig-config --from-literal=APP_MESSAGE="Success: ConfigMap is working on Arch Linux"

#Connect ConfigMap to the Deployment
kubectl set env deployment/rodrig-app-v7 --from=configmap/rodrig-config

#Scale up to 3 Pods
kubectl scale deployment/rodrig-app-v7 --replicas=3


### Step 5: Access

minikube service rodrig-app-service


## 4. Cleanup & Shutdown (Crucial for Arch Linux)

To free up system resources (RAM/CPU) and clean up your Docker registry after the lab:

### A. Remove Kubernetes Resources

#Delete the service and deployment
kubectl delete service rodrig-app-service
kubectl delete deployment rodrig-app-v7

#Delete the ConfigMap
kubectl delete configmap rodrig-config


### B. Stop the Cluster and Docker

#Hibernates the Minikube VM/Container
minikube stop

#Optional: Stop Docker if you don't need it for other tasks
sudo systemctl stop docker


### C. Clean Local Docker Images

#Remove the specific images created during the lab
docker rmi rodrigocasio/my-first-k8s-app:v7

#Remove all unused containers, networks, and dangling images
docker system prune -f

Virtual Routes: Using app.use('/static', ...) is safer than app.use(express.static('public')) when you want to use the root directory for dynamic templates.

ConfigMaps: They allow you to change the behavior of an app without rebuilding the Docker image.

Replica Sets: Scaling to multiple pods provides high availability and allows you to see Kubernetes load balancing in action.
