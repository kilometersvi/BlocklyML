## Directions for Running Milestone 
# Inputting data
1. The first thing needed to start any ML workflow is data. This will involve going to the input data and selecting the desired dataset. In this case, we can chose from either the Penguin or Iris datasets found in the **input data** category. 
2. To actually parse the values in these csv files, the next step is to attach the selected dataset to the "read CSV from file" block also found in the **input data** category. Now, a dataframe exists that has parsed and stored the information found in the dataset CSV file.
# Cleaning data
3. Now comes the data cleansing portion. The first step of this section involves attaching the dataframe, created in steps 1-2, to a "Normalize data" block found in the **clean data** section. This will scale all values between 0-1 and each column will have a distriubtion of values whose mean is 0 and standard deviation is 1. Effectively, normalizing ensures that there is no feature dominance of any features with different scales.
4. The next step is to drop our entries with null values to create a cleaner dataset. This is done by attaching the prevous blocks to the "Drop Null Values From Array" in the **clean data** section.
5. Finally, we select what features we want to use from our dataset to make our prediction by typing them in to the "select features from array" block in **clean data**.
# 

## Directions for Testing Milestone