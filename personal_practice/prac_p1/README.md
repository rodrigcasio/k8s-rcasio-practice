# prac_p1/: Custom Image Workflow

This directory shows how I built a full DevOps pipeline from scratch on my **Arch Linux** machine using *minikube* and *kubectl*. Instead of just using stock images, I built my own app and shipped it.

## File Descriptions

`app.js`: The source code for a simple Node.js web server I wrote.

`Dockerfile`: The set of instructions I used to turn that code into a Docker image.

`deployment.yaml`: The Kubernetes manifest that tells the cluster to run my custom image and sets up the service so I can actually see it in the browser.

GUIDE.md: The full step-by-step breakdown of every command I ran to make this work.

### Summary.. 

I wrote a custom app, baked it into a Docker image, and pushed it up to my personal Docker Hub. Then, I pulled that exact image into my local minikube cluster running on Arch Linux.

This practice proved that I can manage the whole lifecycle of an app—from writing the code to scaling it across multiple replicas in a real Kubernetes environment. Plus, it confirmed that the load balancer is doing its job by hitting different pods every time I refresh.

@rodrigcasio
