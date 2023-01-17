![BG](https://github.com/Maromshi/Background-check/blob/main/ReadMe/BG.png)
# Background Check System

## Goals
***
The system`s goals is to allow companies and employers the option of checking the candidate previous history and felonies in the specific area.
For example, if someone is considered for a job as a driver, the employer could easily check the past felonies that person had in the area of Traffic violations.

The employer will simply fill out an online form with the required details of that person, and the system will then send the relevant query to the server and will return him a score. The score will tell the employer how much that person is a good hire for this role.

In addition, the system will show the employer other felonies that might be relevant, such as Violence or Drugs felonies.

<br/>

## Design
***
* The Client-Side is built using Html,CSS and JS, it will show a form with TextFields to be filled by the user
* The Server-Side is built using NodeJS, and it is responsible for sending the queries to the DB and based on the results, computing the final score that will be sent back to the Client-Side.
* The Database we are using is a NoSQL DB using MongoDB like we practiced in the course. The structure of the JSON object is shown in the following picture:
<br/>
![JS](https://github.com/Maromshi/Background-check/blob/main/ReadMe/JSON%20structure.PNG)
<br/>
In order to populate the DB we are using the technique learnt in this course, using Python language and the library 'pymongo'.

<br/>

## Sequence diagram of the main use
***
![JS](https://github.com/Maromshi/Background-check/blob/main/ReadMe/SequenceDiagram.drawio.png)

<br/>

## Installation
***
* To run the client side please unpack the 'Candidate' zip\folder and run the HTML file. Make sure to change the relevant IP adress and port in the app.js file, to the ip and port that the server will run on.
* To run the server side please open the 'Server.js' file and run it. make sure you see in the console that the server is running and listening on port 3000.
* To populate the DB please create a new DB and collection, you can do that using MongoDBcompass or using the CLI, and open the 'CreateData.py' file. In this file make sure you change the DB and collection names as well as the URL to access the DB.

<br/>

## Distribution of the system
***
As this is a project for a course in 'Distributed Systems', we used Sharding and Replication Sets in order to distribute our DB and therefore making it more efficient. We used 2 Shards for the demonstration, and each Shard had 3 Replication Sets to cover the possibility of a malfunction in the Primary one.
Below are some screenshots of the Sharding and Replication Sets:
<br/>
<br/>
* Sharding of the data, based on the 'Felony Type' field. As you can see the data entered both of the Shards based on MongoDB hashing function:
<br/>
![JS](https://github.com/Maromshi/Background-check/blob/main/ReadMe/shardingFelonies.png)
<br/>
<br/>
* Replication Set of the first Shard:
<br/>
![JS](https://github.com/Maromshi/Background-check/blob/main/ReadMe/Shard1Replicas.png)
<br/>
<br/>
* Replication Set of the second Shard:
<br/>
![JS](https://github.com/Maromshi/Background-check/blob/main/ReadMe/Shard2Replicas.png)
<br/>
<br/>
* The Shards along with its Replication Set:
<br/>
![JS](https://github.com/Maromshi/Background-check/blob/main/ReadMe/ReplicasOfShards.png)
