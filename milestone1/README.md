## Directions for Running Milestone 
# Inputting data
**1. Start with a dataset block**
- The first thing needed to start any ML workflow is data. This will involve going to the input data and selecting the desired dataset. In this case, we can choose from either the **Penguin** or **Iris** datasets found in the **'Input Data'** category.
  
**2. Read dataset**
- To actually parse the values in these CSV files, the next step is to attach the selected dataset to the **'Read CSV from file'** block, also found in the **'Input Data'** category. Now, a dataframe exists that has parsed and stored the information found in the dataset CSV file.

# Cleaning data
**3. Clean dataset**
- Now comes the data cleaning portion. The first step of this section involves attaching the dataframe, created in steps 1-2, to a **'Normalize Data'** block found in the **'Clean Data'** section. This will scale all values between 0-1 and each column will have a distribution of values whose mean is 0 and standard deviation is 1. Effectively, normalizing ensures that there is no feature dominance of any features with different scales.

**4. Drop null values from cleaned dataset**
- The next step is to drop our entries with null values to create a cleaner dataset. This is done by attaching the previous blocks to the **'Drop Null Values From Array'** in the **'Clean Data'** section.

**5. Make predictions from dataset**
- Finally, to make our prediction, we must use the **'Select Attributes from Array'** block in the **'Clean Data'** section. Input the previous blocks into the block input and type comma-separated attributes we want to use from our dataset into the string input.
# 

## Directions for Testing Milestone
