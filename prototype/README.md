# Link to Midterm Presentation
[BlocklyML Slides](https://docs.google.com/presentation/d/14_vS54JWUf9wMg_RiC7GbPkN3oRTnWiqIhMfZN63u1c/edit?usp=sharing)

# Directions for Running Prototype 
## Inputting Data
**1. Start with a dataset block**
- The first thing needed to start any Machine Learning workflow is data. This will involve going to the input data and selecting the desired dataset. In this case, we can choose from either the **Penguin** or **Iris** datasets found in the **'Input Data'** category.
  
**2. Read dataset**
- To actually parse the values in these CSV files, the next step is to attach the selected dataset to the **'Read CSV from file'** block, also found in the **'Input Data'** category. Now, a dataframe exists that has parsed and stored the information found in the dataset CSV file.

## Data Visualization (Optional)
**1. Select type of visualization**
- Provided are blocks for generating the code of a scatterplot or the code for a bar graph. Data visualization is an exploratory step and not required in the model-building process, but it allows for some intuitive analysis of the relationship between variables.

**2. Provide proper x and y axes values**
- For a scatterplot, the x-axis and the y-axis must be inputted as continuous attributes. For example, given the built-in **Penguins** dataset, it is possible to graph the correlation between attributes "bill_length_mm" and "bill_depth_mm" using them as inputs for the _x_ and _y_ axes, respectively.
- For a bar graph, the x-axis must be a categorical variable and the y-axis must be a continiuous variable. For example, the x-axis can be inputted as the "species" of the penguin, while the y-axes can use a variable like "body_mass_g".

## Cleaning Data
**3. Clean dataset**
- The data must be cleaned after being read. The first step of cleaning data involves attaching the dataframe, created in steps 1-2, to a **'Normalize Data'** block found in the **'Clean Data'** section. This will scale all values between 0-1 and each column will have a distribution of values whose mean is 0 and standard deviation is 1. Effectively, normalizing ensures that there is no feature dominance of any features with different scales.

**4. Drop null values from cleaned dataset**
- The next step is to drop our entries with null values to create a cleaner dataset. This is done by attaching the previous blocks to the **'Drop Null Values From Array'** in the **'Clean Data'** section.

**5. Selecting Vectors to Make predictions from dataset**
- Finally, to make our prediction, we must use the **'Select Attributes from Array'** block in the **'Clean Data'** section. Input the previous chained-together blocks into the first empty slot of this block and type the comma-separated attributes we want to use from our dataset into the string input to serve as the independent variables used to predict on our target/dependent variable. To see what variables you can choose from, the link to the **Penguins** dataset is found [here](https://raw.githubusercontent.com/cmparlettpelleriti/CPSC392ParlettPelleriti/master/Data/penguins.csv) and the **Iris** dataset is found [here](https://raw.githubusercontent.com/cmparlettpelleriti/CPSC392ParlettPelleriti/master/Data/iris.csv). 

## Train-Test Split
**6. Splitting the data and target vectors**
- Slide the selected attributes block (containing everything from previous steps) into the leftmost opening of the **'Train-Test Split Data'** block. Then, in the next open slot of the train test split block, type in what target variable you want to predict. Finally, from the dropdown, select what you want the size of the test split to be. That is, if you select 25%, then 25% of your entire dataset will be designated to be in the test set used for validation.

## Model Selection 
**7. Select model type**
- In this step, decide whether you want to work with a classification or regression model (with classification being for categorical predictions and regression being numeric-based prediction), and select the block inside the **Model Selection** tab accordingly.

**8. Using Dropdown for Specific Model**
- From either the classification or regression block you selected, click the dropdown menu to select which specific model you want.

## Model Training
**9. Piecing the Split Data and the Model Selected**
- Now having two blocks, the selected model and the split data, go to the **Model Training** tab and select the **train model and training data** block (the only block here anyway). Attach the selected model to the top half of the block and the split data block to the bottom.

## Model Evaluation
**10. Select Evaluation Corresponding to your Model's Type**
- In the **Model Evaluation** tab select the appropriate model evaluation block that corresponds to your model's type. For example, if you made a linear regression, choose the **Evaluate Regression Model Accuracy Using __** block. Attach this **Evaluate Model Accuracy** block below the model training block.

**11. Making Predictions Using the Test Data**
- In this same **Model Evaluation** tab, select the **Predict with Model** block and drop that into the empty slot of the **Evaluate Model Accuracy** from the previous step. 

**12. Selecting accuracy metric**
- In the **Evaluate Model Accuracy** block from step 10, there is a dropdown that lets you choose what metric will be used to evaluate your model's performance. Select the desired metric.