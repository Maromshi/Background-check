import datetime
import random
import pymongo
import names

start_date = datetime.datetime.now()
end_date = start_date - datetime.timedelta(weeks=2085)
felony_date = str((start_date + (end_date - start_date) * random.random()).date())

first_name = names.get_first_name()
last_name = names.get_last_name()

id_number = str(random.randint(100000000, 999999999))
felonies_array = ["Drugs", "Violence", "Theft", "Sex Crimes", "Traffic"]
felony_type = random.choice(felonies_array)

rand_number_of_felonies = random.randint(1, 20)

myclient = pymongo.MongoClient("mongodb://localhost:27017")
mydb = myclient["TestDB"]
mycol = mydb["Felonies"]

# mycol.delete_many({})

# Example for getting documents by specific query #
# myquery = {"ID": "162381204"}
# arr = list(mycol.find(myquery, {"_id": 0, "Felony Type": 1}))
# print(arr)

for i in range(10):
    id_number = str(random.randint(100000000, 999999999))
    first_name = names.get_first_name()
    last_name = names.get_last_name()
    rand_number_of_felonies = random.randint(1, 20)
    for x in range(rand_number_of_felonies):
        felony_date = str((start_date + (end_date - start_date) * random.random()).date())
        felony_type = random.choice(felonies_array)
        mydict = {
            "ID": id_number,
            "First Name": first_name,
            "Last Name": last_name,
            "Felony Date": felony_date,
            "Felony Type": felony_type
        }
        x = mycol.insert_one(mydict)
