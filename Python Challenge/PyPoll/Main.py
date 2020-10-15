import os 
import csv

# Opening csv file and reader 
filepath = os.path.join ("Resources", "election_data.csv")

total_votes = 0 #Placeholder for total number of votes
candidates = [] #Placeholder for candidate names 

with open (filepath, "r") as file: 
    election_data = csv.reader(file)
    next (election_data, None) #ignore first header row 

    for row in election_data:
        total_votes = total_votes + 1 #calculating total number of votes
        candidates.append( str(row[2]) ) #creating list of all candidates 

    #Finding the unique candidate names 
    unique_list = []    
    for x in candidates:
        if x not in unique_list:
            unique_list.append (x)

    count = len(unique_list) #Total number of candidates

    vote = {} # Dictionary for vote results 

    #Adding candidates into a dictionary 
    for i in unique_list: 
        vote[i] = 0
    

#Reopen file and csv reader so next For loop can run properly (For loop is written explicitly)
with open (filepath, "r") as file: 
    election_data = csv.reader(file)
    next (election_data, None) #ignore first header row 

    #create a dictionary and append key as candidate and value as number of votes 
    for row in election_data: 
        current = str(row[2])
        vote[current] = vote[current] + 1
    
    #Finding the winner
    x = 0
    
    for key in vote: 
        if vote[key] > x: 
            Winner = key 
            x = vote[key]

    # Result Summary    
    print ("Election Results")
    print (".......................................................")
    print (f" Total Votes: {total_votes}")
    print (".......................................................")

    for key in vote: 
        percentage = vote[key] / total_votes 
        percent_format = "{:.3%}".format(percentage)
        print (f" {key} : {percent_format} ({vote[key]})" )
    
    print (".......................................................")
    print (f"Winner: {Winner} ")
    print (".......................................................")

#Exporting Results into a txt file 
f = open ("Analysis\Poll_Summary.txt", "w") #creating txt file into Analysis folder
f.write ("Election Results"  + "\n")
f.write ("..........................................."  + "\n")

for key in vote: 
        percentage = vote[key] / total_votes 
        percent_format = "{:.3%}".format(percentage)
        f.write (f" {key} : {percent_format} ({vote[key]})" + "\n")

f.write ("......................................................." + "\n")
f.write (f"Winner: {Winner} " + "\n")
f.write ("......................................................." + "\n")