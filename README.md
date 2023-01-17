![bg](https://github.com/Maromshi/Background-check/blob/main/ReadMe/BG.png)
# Background Check system
### This system`s purpose is to check the background of a person based on the job type is being considered for
The employer will fill the WEB form and will send a query to the server-side that will return all the past felonies the person had **in that specific area**.
For example, if someone is being considered for a job as a driver, the employer will check all the person`s past traffic violations.

The DB that will be used for this project is a NoSQL DB using MongoDB. In order to practice the subject of distributed systems the DB will be sharded based on the type of felony, that is: "Drugs", "Violence", "Theft", "Sex Crimes", "Traffic".
The sharding will take place locally on one computer that will simulate the DB server, using the MongoDBCompass and its MongoShell.
