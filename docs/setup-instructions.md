# BlocklyML Setup Instructions

Welcome to the documentation for BlocklyML! This document will guide you through the steps to test and run the source code.

## Prerequisites

Before you get started, ensure you have the following installed on your local machine:

- Git: [Installation Guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- A web browser (e.g., Chrome, Firefox, or Safari)
- Docker

## Getting Started

1. **Fork and Clone the Repository**

   Click the "Fork" button on the top-right corner of this repository to create your own copy. Then, clone it to your local machine using the following command:

   ```bash
   git clone https://github.com/elawrie/BlocklyML.git
   ```

2. **Navigate to the project directory**:
   ```sh
   cd your-repository/blocklyml/src
   ```
3. **Build the Docker image** from the Dockerfile:
   ```sh
   sudo docker build -t blocklyml .
   ```
4. **Run the Docker container**:
   ```sh
   sudo docker run -p 80:80 blocklyml
   ```
   This command maps port 80 of the EC2 instance to port 80 of the Docker container, allowing you to access the Flask application via the EC2 instance's public IP or DNS.

5. **Edit Blocks in `custom_blocks.js**

   Use your preferred code editor to open the `custom_blocks.js` file and make any desired changes to the blocks. This file contains the logic for custom blocks in the application.

6. **Preview Changes**

   After making changes in `custom_blocks.js`, restart your docker container.

7. **Create a New Branch**

   Create a new Git branch to work on your changes by running the following command:

   ```bash
   git checkout -b feature/my-new-feature
   ```

8. **Post Changes to Branch**

   Commit your changes to the new branch:

   ```bash
   git add custom_blocks.js
   git commit -m "Add my new feature"
   ```

9. **Submit a Pull Request**

   Push your branch to your forked repository and submit a pull request to the original repository to propose your changes. Make sure to describe your changes in the pull request.

## Enjoy Your Project!

Explore and test your project with the new changes you've made to the custom blocks.

## Running on AWS

To run the modified BlocklyML project on an AWS EC2 instance, you will need to follow these steps:

### Step 1: Set up an AWS EC2 Instance

1. **Log in to AWS Management Console** and navigate to the EC2 Dashboard.
2. **Launch a new EC2 instance** by selecting a suitable Amazon Machine Image (AMI). For a Python application, an Amazon Linux 2 or Ubuntu Server would be a good choice.
3. **Choose an Instance Type**. For testing purposes, a `t2.micro` instance (which is free-tier eligible) may be sufficient.
4. **Configure Instance Details** as needed for your application.
5. **Add Storage** if the default storage size is not sufficient for your needs.
6. **Add Tags** to help organize and manage the instance.
7. **Configure Security Group** to set up the firewall rules. Make sure to add rules for the following:

    SSH (Secure Shell) - Port 22: Allow SSH access to manage the instance remotely. (should be in default new security group when making new EC2)
    HTTP (Hypertext Transfer Protocol) - Port 80: Allow web traffic to your Flask application. Set the following:
        Type: HTTP
        Protocol: TCP
        Port Range: 80
        Source: 0.0.0.0/0 (for public access) or your specific IP address (for restricted access).
   
8. **Review and Launch** the instance.
9. **Create a new key pair** or select an existing one, and download it. This key pair will be used to SSH into the instance. Without a key pair, AWS will not let you SSH. If creating a new keypair, you will need to run `chmod 400 keypair.pem`

### Step 2: Connect to Your Instance

1. **SSH into your instance** using the downloaded key pair. For example:
   ```sh
   ssh -i /path/to/your-key.pem ec2-user@your-instance-public-dns
   ```
   Replace `/path/to/your-key.pem` with the path to your key file and `your-instance-public-dns` with the public DNS of your EC2 instance.

### Step 3: Set Up the Environment

1. **Update the package manager** and **install necessary packages**:
   ```sh
   sudo yum update -y  # For Amazon Linux
   sudo apt update && sudo apt upgrade -y  # For Ubuntu
   ```
2. **Install Docker** on the EC2 instance:
   ```sh
   sudo yum install docker  # For Amazon Linux
   sudo apt install docker.io  # For Ubuntu
   ```
3. **Start the Docker service** and **add your user to the Docker group**:
   ```sh
   sudo service docker start
   sudo usermod -a -G docker $USER
   ```
   You may need to log out and log back in for the group change to take effect.
4. **Install Git** on the EC2 instance:
   ```sh
   sudo yum install git  # For Amazon Linux
   sudo apt install git  # For Ubuntu
   ```

### Step 4: Deploy the Application

1. **Clone your repository** into the EC2 instance:
   ```sh
   git clone https://github.com/elawrie/BlocklyML.git
   ```
2. **Navigate to the project directory**:
   ```sh
   cd your-repository/blocklyml/src
   ```
3. **Build the Docker image** from the Dockerfile:
   ```sh
   sudo docker build -t blocklyml .
   ```
4. **Run the Docker container**:
   ```sh
   sudo docker run -p 80:80 blocklyml
   ```
   This command maps port 80 of the EC2 instance to port 80 of the Docker container, allowing you to access the Flask application via the EC2 instance's public IP or DNS.

### Step 5: Access the Application

- Open a web browser and navigate to the public IP or DNS of your EC2 instance. You should see the BlocklyML interface.

### Step 6: Security Considerations

- For production environments, it's crucial to set up HTTPS, possibly using a service like Let's Encrypt.
- Consider using a more robust web server like Nginx or Apache to serve your Flask application in a production setting.
- Regularly update your instance with security patches.

Remember to stop or terminate your EC2 instance if you're not using it to avoid incurring unnecessary charges.