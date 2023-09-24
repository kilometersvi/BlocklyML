# Block Execution

## Input Data
Load the dataset into a DataFrame using Pandas
import pandas as pd

Dataframe = pd.read_csv(‘filename.csv’)

## Clean Data
### Step 1: Standardization and Normalization
Standardize (z-score) or normalize (min-max scaling) numerical features

### Step 2: Handling Missing Values
Identify and handle missing values
data.dropna()

### Step 3: Selecting features 
Select the columns the user wants to use for training the model

Data = data.loc[list_of_selected]

## Data Visualizations 
Outputs a graph, given the options of a scatterplot, bar graph, and correlation heatmap. Below is an example of code to generate a data visualization using ggplot:

(ggplot(input_data, aes(x = "x_axis_data", y = "y_axis_data")) + geom_point() + theme_bw() + geom_smooth(method = "lm", color = "red") + 
labs(title="x data Vs. Y data", x = "x_axis_data", y = "y_axis_data"))

## Train Test Split
Below is an example of the functionality implemented by a block to split the data into a training set and testing set:

### Split the data into training and testing sets
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(${dataInput}, test_size=${testSize})

### Output the training and testing datasets
Train_Data = X_train, y_train
Test_Data = X_test, y_test
return [`Train_Data, Test_Data`]

## Model Selection
This block allows users to select between various classification and regression models 
Examples of model instantiation: 

linearReg = LinearRegression()
logisticReg = LogisticRegression()

## Model Training
Train the model using the fit function on the training data
Examples of model training:

logisticReg.fit(X_train, y_train)
linearReg.fit(X_train, y_train)

## Hyperparameter Tuning
Gives users the option to manually change values of the hyperparameters they choose for the given mode
This is an example of selecting specific hyperparameters for a model:

xgbReg = xgb.XGBRegressor(
n_estimators=500,
colsample_bytree = 0.6,
early_stopping_rounds=50,
objective='reg:squarederror',
max_depth=10,
learning_rate=0.05)

## Model Evaluation
There are many different ways to evaluate a model's performance below are a few methods we will implement:

### Regression: Accuracy Score
Accuracy score is a proportion of accurate predictions to not accurate predictions. It’s basically a percentage of how many times it correctly classifies a data point. 

accuracy_score(y_test,logitReg.predict(X_test))

For any regression model, mean squared error is a great way to see how far your model is predicting from the actual observed data. 

mse_for_test_set = mean_squared_error(y_test, predictions_using_test)

Linear regression models can be assessed with an r2 score to see how well dependent variable is explained by the dependent variables. Essentially, it’s a score to see how appropriate the predictions are to the true observed data. 

r2_score_for_test_set = r2_score(y_test, predictions_using_test)

### Classification: Confusion Matrix
A confusion matrix is a visual representation of true positives, false positives, true negatives, and false negatives. They can show you exactly what types of predictions are more frequently made by your classification model. 

ConfusionMatrixDisplay.from_predictions(y_test, logisticRegression.predict(x_test))

# Recursive Use Case 
Decision Trees will be one of the classification models available in BlocklyML. Constructing this type of model involves having it make certain types of decisions then recursively apply the decision-making process on the data. The base case for a recursive Blockly program that implements constructing a Decision Tree would be stopping when the maximum depth of the tree is reached, all samples in a node belong to the same class, or if there are no splits left to be made. For the recursive step, reduce the depth and apply the split based on the decision-making criteria, then recursively call the function on the reduced depth. Implementing this in Blockly would demonstrate a modular approach in creating a complex model with simple blocks. It would look like Node or Decision_Tree blocks wrapped within a Decision_Tree block which the user can infinitely build upon.


# Data and Interaction

The user can provide the data using a CSV file, formatted such as this:


HoursStudied, ExamScore
2, 85
3, 92
1.5, 60
4, 94
5, 98
2.5, 75
1, 45
3.5, 88
4.5, 92
