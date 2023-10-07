// Interact with Blockly (e.g., run code)

// Define custom blocks
Blockly.Blocks['read_csv'] = {
    init: function() {
        this.appendValueInput('csv_file')
            .setCheck('String') // Set the input type to "String"
            .appendField("Read CSV from file");
        this.setOutput(true, "String");
        this.setColour(210);
        this.setTooltip("Read CSV data from a file.");
        this.setHelpUrl("");
    }
};


Blockly.Python['read_csv'] = function(block) {
    var csv_file = Blockly.Python.valueToCode(block, 'csv_file', Blockly.Python.ORDER_ATOMIC) || "sample.csv";

    var code = `import pandas as pd\ndf = pd.read_csv('${csv_file}')`;
    return code;
};


// Define a custom block for printing CSV data
Blockly.Blocks['print_data'] = {
init: function () {
    this.appendValueInput("URL")
        .setCheck("String")
        .appendField("Print CSV Data");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("Print the loaded CSV data.");
    this.setHelpUrl("");
}
};

Blockly.Python['print_data'] = function(block) {
    var url = Blockly.Python.valueToCode(block, 'URL', Blockly.Python.ORDER_ATOMIC);
    var code = `${url}\nprint(df)`;

    return code;
};

// Define a custom block for data normalization
Blockly.Blocks['normalize_data'] = {
init: function () {
    this.appendValueInput('DATA')
        .setCheck('String')
        .appendField("Normalize Data");
    this.setOutput(true, 'String');
    this.setColour(240);
    this.setTooltip("Normalize the input data between 0 and 1.");
    this.setHelpUrl('');
}
};

// Generate code for data normalization
Blockly.Python['normalize_data'] = function (block) {
    // Get the 'read_csv' block
    var readCsvBlock = workspace.getBlockById('read_csv'); // Replace 'your_block_id' with the actual block ID

    if (readCsvBlock) {
        // Retrieve the generated Python code from the block
        var generatedCode = Blockly.Python.blockToCode(readCsvBlock);

        // Now 'generatedCode' contains the Python code generated by the 'read_csv' block
        console.log('Generated Code:', generatedCode);
    } else {
        console.log('Block not found');
    }

    // Python code for data normalization using StandardScaler
    var code = `
from sklearn.preprocessing import StandardScaler
sta = StandardScaler()

${generatedCode}

numeric_cols = df.select_dtypes(include=['number'])
df_normalized = pd.DataFrame(sta.fit_transform(df), columns=df.columns)
print(df_normalized)
`;
  
    return code;
  };
  

// Define a custom block to drop null values from an array
Blockly.Blocks['drop_nulls'] = {
init: function () {
    this.appendValueInput("DATA")
        .setCheck("String")
        .appendField("Drop Null Values from Array");
    this.setOutput(true, 'String');
    this.setColour(240);
    this.setTooltip("Remove null (missing) values from the input array.");
    this.setHelpUrl("");
}
};

Blockly.Python['drop_nulls'] = function (block) {
    // Get the 'read_csv' block
    var readNormalizedData = workspace.getBlockById('normalize_data'); // Replace 'your_block_id' with the actual block ID

    if (readNormalizedData) {
        // Retrieve the generated Python code from the block
        var generatedCode = Blockly.Python.blockToCode(readNormalizedData);

        // Now 'generatedCode' contains the Python code generated by the 'read_csv' block
        console.log('Generated Code:', generatedCode);
    } else {
        console.log('Block not found');
    }

    // Python code for data normalization using StandardScaler
    var code = `
${generatedCode}

df_normalized = df_normalized.dropna()
`;
  
    return code;
  };

// Define a custom block for selecting attributes
Blockly.Blocks['attribute_selection'] = {
init: function () {
    this.appendValueInput("DATA")
        .setCheck("Array")
        .appendField("Select Attributes from Array");
    this.appendDummyInput()
        .appendField("Attributes:")
        .appendField(new Blockly.FieldTextInput("attr1,attr2"), "SELECTED_ATTRIBUTES");
    this.setOutput(true, "Array");
    this.setColour(240);
    this.setTooltip("Select specific attributes from the input array.");
    this.setHelpUrl("");
}
};

// Define a custom block for creating a scatterplot
Blockly.Blocks['scatterplot'] = {
init: function () {
    this.appendDummyInput()
        .appendField("Create Scatterplot")
    // this.appendValueInput("DATA")
    //     .setCheck("String")
    //     .appendField("Create Scatterplot");
    this.appendDummyInput()
        .appendField("X-Axis:")
        .appendField(new Blockly.FieldTextInput("x"), "X_AXIS");
    this.appendDummyInput()
        .appendField("Y-Axis:")
        .appendField(new Blockly.FieldTextInput("y"), "Y_AXIS");
    // this.setPreviousStatement(true, null);
    // this.setNextStatement(true, null);
    this.setOutput(true, "String");
    this.setColour(270);
    this.setTooltip("Create a scatterplot from the input data.");
    this.setHelpUrl("");
}
};

Blockly.Python['scatterplot'] = function(block) {
    var x = block.getFieldValue('X_AXIS');
    var y = block.getFieldValue('Y_AXIS');
    // var df = block.getFieldValue('DATA');
    var code = `(df, aes(x = '${x}', y = '${y}) + geom_point)`;
    return [code, Blockly.Python.ORDER_ATOMIC]
};

// Define a custom block for creating a bar chart
Blockly.Blocks['bar_chart'] = {
init: function () {
    this.appendValueInput("DATA")
        .setCheck("Array")
        .appendField("Create Bar Chart");
    this.appendDummyInput()
        .appendField("X-Axis:")
        .appendField(new Blockly.FieldTextInput("x"), "X_AXIS");
    this.appendDummyInput()
        .appendField("Y-Axis:")
        .appendField(new Blockly.FieldTextInput("y"), "Y_AXIS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
    this.setTooltip("Create a bar chart from the input data.");
    this.setHelpUrl("");
}
};

// Define a custom block for creating a correlation heatmap
Blockly.Blocks['correlation_heatmap'] = {
init: function () {
    this.appendValueInput("DATA")
        .setCheck("Array")
        .appendField("Create Correlation Heatmap");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
    this.setTooltip("Create a correlation heatmap from the input data.");
    this.setHelpUrl("");
}
};

// Define a custom block for train-test split
Blockly.Blocks['train_test_split'] = {
init: function () {
    this.appendValueInput("DATA")
        .setCheck("Array")
        .appendField("Train-Test Split");
    this.appendDummyInput()
        .appendField("Train Ratio:")
        .appendField(new Blockly.FieldDropdown([
        ["70%", "0.7"],
        ["75%", "0.75"],
        ["80%", "0.8"]
        ]), "TRAIN_RATIO");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip("Split the input data into training and testing sets.");
    this.setHelpUrl("");
}
};

// Define a custom block for choosing a regression model
Blockly.Blocks['choose_regression_model'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Choose Regression Model:")
            .appendField(new Blockly.FieldDropdown([
            ["Linear Regression", "LinearRegression"],
            ["Regression Trees", "DecisionTreeRegressor"],
            ["Random Forest", "RandomForestRegressor"]
            ]), "REGRESSION_MODEL");
        this.setOutput(true, "String");
        this.setColour(330);
        this.setTooltip("Select a regression model for your machine learning task.");
        this.setHelpUrl("");
    }
    };
    
// implement regression model selection
Blockly.Python['choose_regression_model'] = function(block) {
    var model = block.getFieldValue('REGRESSION_MODEL');
    var imports = "from sklearn.linear_model import LinearRegression\nfrom sklearn.tree import DecisionTreeRegressor\nfrom sklearn.ensemble import RandomForestRegressor\n";
    code = imports + "model = " + model + "()\n"
    return code;
};

// Define a custom block for choosing a classification model
Blockly.Blocks['choose_classification_model'] = {
init: function () {
    this.appendDummyInput()
        .appendField("Choose Classification Model:")
        .appendField(new Blockly.FieldDropdown([
        ["Logistic Regression", "LogisticRegression"],
        ["K-Nearest Neighbors", "KNeighborsClassifier"],
        ["Decision Trees", "DecisionTreeClassifier"]
        ]), "CLASSIFICATION_MODEL");
    this.setOutput(true, "String");
    this.setColour(330);
    this.setTooltip("Select a classification model for your machine learning task.");
    this.setHelpUrl("");
}
};

// implement classification model selection
Blockly.Python['choose_classification_model'] = function(block) {
    var model = block.getFieldValue('CLASSIFICATION_MODEL');
    var imports = "from sklearn.linear_model import LogisticRegression\nfrom sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.tree import DecisionTreeClassifier\n";
    if (model === 'KNeighborsClassifier') {
        var code = imports + "model = " + model + "(n_neighbors=5)\n";
    }
    else {
        var code = imports + "model = " + model + "()\n";
    }
    return code;
};

// Define a custom block for training a machine learning model
Blockly.Blocks['train_model'] = {
init: function () {
    this.appendValueInput("MODEL")
        .setCheck("String")
        .appendField("Train Model");
    this.appendValueInput("TRAIN_DATA")
        .setCheck("String")
        .appendField("Training Data");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(360);
    this.setTooltip("Train a selected machine learning model with the provided training data.");
    this.setHelpUrl("");
}
};

// implement model training
Blockly.Python['train_model'] = function(block) {
    // var model = block.getFieldValue('MODEL');
    // var trainData = block.getFieldValue('TRAIN_DATA');
    var code = "model.fit(x_train, y_train)";
    return code;
};

// Define a custom block for hyperparameter tuning using GridSearchCV
Blockly.Blocks['hyperparameter_tuning'] = {
init: function () {
    this.appendDummyInput()
        .appendField("Set Hyperparameters for Model:");
    this.appendValueInput("MODEL")
        .setCheck("String");
    this.appendStatementInput("HYPERPARAMETERS")
        .setCheck(null)
        .appendField("Hyperparameters:");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
    this.setTooltip("Set hyperparameter values for a machine learning model.");
    this.setHelpUrl("");
}
};

// Define a custom block for setting a hyperparameter and its value
Blockly.Blocks['set_hyperparameter'] = {
init: function () {
this.appendDummyInput()
    .appendField("Set")
    .appendField(new Blockly.FieldTextInput("hyperparameter_name"), "HYPERPARAMETER_NAME")
    .appendField("to");
this.appendValueInput("VALUE")
    .setCheck("Number");
this.setPreviousStatement(true, null);
this.setNextStatement(true, null);
this.setColour(30);
this.setTooltip("Set the value of a hyperparameter for the model.");
this.setHelpUrl("");
}
};

// Define a custom block for specifying the numeric value of a hyperparameter
Blockly.Blocks['hyperparameter_value'] = {
init: function () {
this.appendDummyInput()
    .appendField("Hyperparameter Value:")
    .appendField(new Blockly.FieldNumber(0), "VALUE");
this.setOutput(true, "Number");
this.setColour(30);
this.setTooltip("Specify the numeric value of a hyperparameter.");
this.setHelpUrl("");
}
};

// Define a custom block for evaluating the accuracy of regression models
Blockly.Blocks['evaluate_regression_model'] = {
init: function () {
    this.appendValueInput("TRUE_LABELS")
        .setCheck("Array")
        .appendField("Evaluate Regression Model Accuracy");
    this.appendDummyInput()
        .appendField("Using")
        .appendField(new Blockly.FieldDropdown([["Mean Squared Error (MSE)", "mse"], ["R-squared (R²)", "r2"]]), "METRIC");
    this.setOutput(true, "Number");
    this.setColour(55);
    this.setTooltip("Evaluate the accuracy of a regression model using Mean Squared Error (MSE) or R-squared (R²).");
    this.setHelpUrl("");
}
};

// Define a custom block for evaluating the performance of classification models
Blockly.Blocks['evaluate_classification_model'] = {
    init: function () {
        this.appendValueInput("TRUE_LABELS")
            .setCheck("Array")
            .appendField("Evaluate Classification Model Performance");
        this.appendDummyInput()
            .appendField("Using")
            .appendField(new Blockly.FieldDropdown([["Accuracy Score", "accuracy"], ["Confusion Matrix", "confusion_matrix"]]), "METRIC");
        this.setOutput(true, null);
        this.setColour(55);
        this.setTooltip("Evaluate the performance of a classification model using Accuracy Score or Confusion Matrix.");
        this.setHelpUrl("");
    }
};

//Define the custom block that will process inputting the Penguin Dataset
Blockly.Blocks['Penguins Dataset'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Penguins Dataset");
        this.setOutput(true, "String"); // Change the output type to "String"
        this.setColour(210);
        this.setTooltip("Penguins Dataset");
        this.setHelpUrl("");
    }
};

Blockly.Python['Penguins Dataset'] = function(block) {
    var csv_file = 'https://raw.githubusercontent.com/cmparlettpelleriti/CPSC392ParlettPelleriti/master/Data/penguins.csv';
    return [csv_file, Blockly.Python.ORDER_ATOMIC];
};



//Define the custom block that will process inputting the Iris Dataset
Blockly.Blocks['Iris Dataset'] = {
init: function () {
    this.appendDummyInput()
        .appendField("Iris Dataset")
    this.setOutput(true, "String");
    this.setColour(210);
    this.setTooltip("Iris Dataset");
    this.setHelpUrl("");
}
};

Blockly.Python['Iris Dataset'] = function(block) {
    var csv_file = 'https://raw.githubusercontent.com/cmparlettpelleriti/CPSC392ParlettPelleriti/master/Data/iris.csv'
    return [csv_file, Blockly.Python.ORDER_ATOMIC];
};

// Define the custom block that will process inputing custom User Dataset
Blockly.Blocks['Custom Dataset'] = {
    init: function () {
        this.appendDummyInput()
            // .appendField("Custom Dataset")
            .appendField(new Blockly.FieldTextInput('sample.csv'), 'csv_file')
            .appendField('Dataset');
        this.setOutput(true, "String");
        this.setColour(210);
        this.setTooltip("Custom CSV input");
        this.setHelpUrl("");
    }
};

Blockly.Python['Custom Dataset'] = function(block) {
    var csv_file = block.getFieldValue('csv_file');
    var code = "'" + csv_file + "'";
    return [code, Blockly.Python.ORDER_ATOMIC];
};