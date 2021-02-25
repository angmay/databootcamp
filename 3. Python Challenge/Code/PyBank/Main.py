import os 
import csv

filepath = os.path.join ("Resources","budget_data.csv")

print ("Financial Analysis")
print ("..................................")

net_amount = 0
total_months = 0
net_change = []
previous = 0
min = 0
max = 0
min_date = "string"
max_date = "string"

with open (filepath, "r") as file: 
    py_Bank = csv.reader(file)
    next (py_Bank, None) # Removing header row 


    for row in py_Bank: 
        net_amount = net_amount + int(row[1]) #cumulative sum of Profit/Losses
        total_months = total_months + 1 # each row is a new month, cumulative sum of numner of rows

        #Average changes 
        change = int(row[1]) - previous 
        net_change = net_change + [change]
        previous = int(row[1])

        if int(row[1]) < min: #finding min value in Profit/Losses
            min = int(row[1])
            min_date = row[0]
        elif int(row [1]) > max: #finding max value in Profit/Losses
            max = int(row[1])
            max_date = row [0]
    
    #Average Change Calculation 
    avg_change = round (sum(net_change) / len(net_change))
    
    # Data Summary 
    print (f"Total Months : {total_months}")
    print (f"Net Amount : ${net_amount}")
    print (f"Average Change : ${avg_change}")
    print (f"Greatest Increase in Profits : {max_date} (${max})")
    print (f"Greatest Decrease in Profits : {min_date} (${min})")

# Data Summary into a txt file 
f = open ("Analysis\Data_Summary.txt", "w") #creating txt file into Analysis folder
f.write ("Financial Analysis"  + "\n")
f.write ("..........................................."  + "\n")
f.write (f"Total Months : {total_months}" + "\n")
f.write (f"Net Amount : ${net_amount}" + "\n")
f.write (f"Average Change : ${avg_change}" + "\n")
f.write (f"Greatest Increase in Profits : {max_date} (${max})" + "\n")
f.write (f"Greatest Decrease in Profits : {min_date} (${min})" + "\n")