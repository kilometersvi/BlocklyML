# Block Design

## Input Data
- Allow users to input the data as a csv file
- Use the function dataFrame = pd.read_csv(data)
- Print out the data frame to show the user a visualization of their data through just print(dataFrame)

## Clean Data 
- Users should be able to normalize data through the provided StandardScaler() from Scikit-Learn 
- Users are able to drop null values through .dropna()
- Allow users to select which attributes they want to use. Whether it be all attributes or maybe a select amount
- Implement an average value imputer to fill in the gaps of missing values (optional)

## Data Visualizations
- Create graphs showing the attributes to interpret attribute influence
- Show which is most predictive for the target variable or best at classifying 

## Train Test Split
- Choose split level
- Users should be able to choose between 70, 75, and 80 for the train split and between 30, 25, and 20 for the test split

## Model Selection 
- Create the model based on user selection 
- Users have the options between
- Continuous: 
    - Linear regression
    - Regression trees 
    - Random forest/Xgboost
- Classification: 
    - Logistic regression
    - K-nearest neighbors
    - Decision trees
    - Random forest/Xgboost

## Train the Model
- Train function (model.fit(train_data)) from Scikit-Learn on the selected model 

## Hyperparameter Selection
- Implement a block for Grid Search using GridSearchCV() to pick the best hyperparameters for the model 

## Model Evaluation
- Use model evaluation methods to show users the statistical output of their models
- Continuous: 
    - Use the R2 method of evaluation 
- Classification:
    - Create a confusion matrix 
