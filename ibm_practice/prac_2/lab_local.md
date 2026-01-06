# **Lab Guide: Introduction to Kubernetes (Pods & Deployments)**

This guide provides the local workflow for completing the **IBM Intro to K8s Part 2** lab using **Minikube** and **Docker** on Arch Linux.

## **Phase 0: Setup**

Before starting, ensure the local cluster is running:

1. sudo systemctl start docker  
2. minikube start \--driver=docker

## **Task 1: Basic Pod Management**

The Pod is the smallest unit in Kubernetes.

1. **Create a Pod**:  
   kubectl run hello-world \--image=nginx

2. **Inspect the Pod**:  
   kubectl get pods \-o wide  
   kubectl describe pod hello-world

3. **Delete the Pod**:  
   kubectl delete pod hello-world

## **Task 2: Declarative Deployment (1 Replica)**

Instead of manual pods, we use a Deployment to ensure availability.

1. **Configuration (hello-world-create.yaml)**:  
   apiVersion: apps/v1  
   kind: Deployment  
   metadata:  
     name: hello-world  
   spec:  
     replicas: 1  
     selector:  
       matchLabels:  
         app: hello-world  
     template:  
       metadata:  
         labels:  
           app: hello-world  
       spec:  
         containers:  
         \- name: hello-world  
           image: nginx  
           ports:  
           \- containerPort: 80

2. **Apply**: kubectl create \-f hello-world-create.yaml  
3. **Verify**: kubectl get deployments and kubectl get replicasets

## **Task 3: Scaling & Load Balancing (3 Replicas)**

We scale the app and witness how Kubernetes handles traffic.

1. Update Configuration (hello-world-apply.yaml):  
   Modify the replicas field from 1 to 3\.  
2. **Apply Update**:  
   kubectl apply \-f hello-world-apply.yaml

3. **Expose the Service**:  
   kubectl expose deployment hello-world \--port=80 \--type=NodePort

4. **Local Access & Test**:  
   minikube service hello-world

   *Refresh the browser to see traffic distributed among the 3 new pods.*

## **Cleanup**

kubectl delete deployment hello-world  
kubectl delete service hello-world  
minikube stop

