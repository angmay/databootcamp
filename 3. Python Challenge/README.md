Challenge completed on: October 15, 2020

## Background

Two python scripts have been written to: 1. Calculate election data and tally each vote (PyPoll) and 2. Analyze financial records of a company to output a summary of profit/losses (PyBank). 

*If you are running the code, please make sure your file directory is within each folder (PyPoll or PyBank specifically).* 

## PyPoll

Raw data was provided as such: 

![Raw Data Snip](Images/PyPoll-rawdata.PNG)

The script will identify each unique candidate and output their number of votes. The script will output a text file of the results.

  ```text
  Election Results
  -------------------------
  Total Votes: 3521001
  -------------------------
  Khan: 63.000% (2218231)
  Correy: 20.000% (704200)
  Li: 14.000% (492940)
  O'Tooley: 3.000% (105630)
  -------------------------
  Winner: Khan
  -------------------------
  ```

## PyBank

Raw data was provided as such: 

![Raw Data Snip](Images/PyBank-rawdata.PNG)

The script will output a text file of the results.

  ```text
  Financial Analysis
  ----------------------------
  Total Months: 86
  Total: $38382578
  Average  Change: $-2315.12
  Greatest Increase in Profits: Feb-2012 ($1926159)
  Greatest Decrease in Profits: Sep-2013 ($-2196167)
  ```

