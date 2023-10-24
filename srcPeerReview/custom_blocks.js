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

    var code = `import pandas as pd\ndf = pd.read_csv('${csv_file}')`.replace(/^\s+/gm, '');
    return [code, Blockly.Python.ORDER_NONE];
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
    var code = `${url}\nprint(df)`.replace(/^\s+/gm, '');

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
    var readCsvBlock = block.getInputTargetBlock('DATA');
    if (readCsvBlock) {
        // Retrieve the generated Python code from the block
        var generatedCode = Blockly.Python.blockToCode(readCsvBlock)[0];

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
        df_normalized = pd.DataFrame(sta.fit_transform(numeric_cols), columns=numeric_cols.columns)
        print(df_normalized)
        df[df_normalized.columns] = df_normalized
    `.replace(/^\s+/gm, '');
  
    return [code, Blockly.Python.ORDER_ATOMIC] 
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
    var readNormalizedData = block.getInputTargetBlock('DATA');

    if (readNormalizedData) {
        // Retrieve the generated Python code from the block
        var generatedCode = Blockly.Python.blockToCode(readNormalizedData)[0];

        // Now 'generatedCode' contains the Python code generated by the 'read_csv' block
        console.log('Generated Code:', generatedCode);
    } else {
        console.log('Block not found');
    }

    // Python code for data normalization using StandardScaler
    var code = `
        ${generatedCode}

        df = df.dropna()
    `.replace(/^\s+/gm, '');
  
    return [code, Blockly.Python.ORDER_NONE];
};

// Define a custom block for selecting attributes
Blockly.Blocks['attribute_selection'] = {
    init: function () {
        this.appendValueInput("DATA")
            .setCheck("String")
            .appendField("Select Attributes from Array");
        this.appendDummyInput()
            .appendField("Attributes:")
            .appendField(new Blockly.FieldTextInput("attr1,attr2"), "SELECTED_ATTRIBUTES");
        this.setOutput(true, "String");
        this.setColour('green');
        this.setTooltip("Select specific attributes from the input array.");
        this.setHelpUrl("");
    }
};
    
Blockly.Python['attribute_selection'] = function (block) {
    // Get the 'normalize_data' block
    var readDroppedNullData = block.getInputTargetBlock('DATA');

    if (readDroppedNullData) {
        // Retrieve the generated Python code from the block
        var generatedCode = Blockly.Python.blockToCode(readDroppedNullData)[0];

        // Now 'generatedCode' contains the Python code generated by the 'normalize_data' block
        console.log('Generated Code:', generatedCode);
    } else {
        console.log('Block not found');
    }

    // Python code for data selection and normalization using StandardScaler
    var selectedAttributes = block.getFieldValue('SELECTED_ATTRIBUTES');
    var code = `
${generatedCode}
data = df[[${selectedAttributes.split(',').map(attr => `'${attr.trim()}'`).join(', ')}]]
`.replace(/^\s+/gm, '');
    return [code, Blockly.Python.ORDER_NONE];
};
    
// Define a custom block for creating a scatterplot
Blockly.Blocks['scatterplot'] = {
    init: function () {
        this.appendValueInput("DATA")
            .setCheck("String")
            .appendField("Create Scatterplot");
        this.appendDummyInput()
            .appendField("X-Axis (Continuous):")
            .appendField(new Blockly.FieldTextInput("x"), "X_AXIS");
        this.appendDummyInput()
            .appendField("Y-Axis (Continuous):")
            .appendField(new Blockly.FieldTextInput("y"), "Y_AXIS");
        this.appendDummyInput()
            .appendField("Color (Categorical):")
            .appendField(new Blockly.FieldTextInput("none"), "Z_AXIS");
        this.appendDummyInput()
            .appendField("Theme:")
                .appendField(new Blockly.FieldDropdown([
                    ['Gray', 'gray'],
                    ['Black & White', 'bw'],
                    ['Line Drawing', 'linedraw'],
                    ['Light', 'light'],
                    ['Dark', 'dark'],
                    ['Minimal', 'minimal'],
                    ['Classic', 'classic'],
                    ['Void', 'void']
                ]), 'THEME');
        // this.setPreviousStatement(true, null);
        // this.setNextStatement(true, null);
        this.setColour(270);
        this.setTooltip("Create a scatterplot from the input data.");
        this.setHelpUrl("");
    }
};

Blockly.Python['scatterplot'] = function(block) {
    var readCsvBlock = block.getInputTargetBlock('DATA');
    var df = Blockly.Python.blockToCode(readCsvBlock)[0];
    var x = block.getFieldValue('X_AXIS');
    var y = block.getFieldValue('Y_AXIS');
    var z = block.getFieldValue('Z_AXIS');
    var theme = block.getFieldValue('THEME');
    
    var code = `from plotnine import *\n${df}\n(ggplot(df, aes(x = '${x}', y = '${y}'${z == "none" ? '' : `, color = '${z}'`})) + geom_point() + theme_${theme}())`.replace(/^\s+/gm, '');
    return readCsvBlock ? code : `# no dataframe inputted`;
};

// Define a custom block for creating a bar chart
Blockly.Blocks['bar_chart'] = {
init: function () {
    this.appendValueInput("DATA")
        .setCheck("String")
        .appendField("Create Bar Chart");
    this.appendDummyInput()
        .appendField("X-Axis (Categorical):")
        .appendField(new Blockly.FieldTextInput("x"), "X_AXIS");
    this.appendDummyInput()
        .appendField("Y-Axis (Continuous):")
        .appendField(new Blockly.FieldTextInput("y"), "Y_AXIS");
    this.appendDummyInput()
        .appendField("Theme:")
            .appendField(new Blockly.FieldDropdown([
                ['Gray', 'gray'],
                ['Black & White', 'bw'],
                ['Line Drawing', 'linedraw'],
                ['Light', 'light'],
                ['Dark', 'dark'],
                ['Minimal', 'minimal'],
                ['Classic', 'classic'],
                ['Void', 'void']
            ]), 'THEME');
    // this.setPreviousStatement(true, null);
    // this.setNextStatement(true, null);
    this.setColour(270);
    this.setTooltip("Create a bar chart from the input data.");
    this.setHelpUrl("");
}
};

Blockly.Python['bar_chart'] = function(block) {
    var readCsvBlock = block.getInputTargetBlock('DATA');
    var df = Blockly.Python.blockToCode(readCsvBlock)[0];
    var x = block.getFieldValue('X_AXIS');
    var y = block.getFieldValue('Y_AXIS');
    var theme = block.getFieldValue('THEME');

    var code = `from plotnine import *\n${df}\n(ggplot(df, aes(x = '${x}', y = '${y}', fill = '${x}')) + geom_bar(stat = 'identity') + theme_${theme}())`.replace(/^\s+/gm, '');
    return readCsvBlock ? code : `# no dataframe inputted`;
}

// Define a custom block for train-test split
Blockly.Blocks['train_test_split'] = {
    init: function () {
        this.appendValueInput("train_data")
            .setCheck("String")
            .appendField("Train-Test Split Data");
        this.appendValueInput("target")
            .setCheck("String")
            .appendField("Target Variable");
        this.appendDummyInput("ratio")
            .appendField("Train Ratio:")
            .appendField(new Blockly.FieldDropdown([
            ["20%", "0.2"],
            ["25%", "0.25"],
            ["30%", "0.3"]
            ]), "TRAIN_RATIO");
        this.setOutput(true, "String")
        this.setColour(300);
        this.setTooltip("Split the input data into training and testing sets.");
        this.setHelpUrl("");
    }
    };

    Blockly.Python['train_test_split'] = function(block) {
        var ratio = block.getFieldValue('TRAIN_RATIO');
        var readCsvBlock = block.getInputTargetBlock('train_data');
        if (readCsvBlock) {
        // Retrieve the generated Python code from the block
            var generatedCode = Blockly.Python.blockToCode(readCsvBlock)[0];

            console.log('Generated Code:', generatedCode);
        } else {
            console.log('Block not found');
        }
        var readCsvBlock2 = block.getInputTargetBlock('target');
        if (readCsvBlock2) {
        // Retrieve the generated Python code from the block
            var generatedCode2 = Blockly.Python.blockToCode(readCsvBlock2)[0];

            console.log('Generated Code:', generatedCode2);
        } else {
            console.log('Block not found');
        }

        // Python code for data normalization using StandardScaler
        var code = `
        ${generatedCode}
        ${generatedCode2}
        from sklearn.model_selection import train_test_split\n
        X_train, X_test, y_train, y_test = train_test_split(data,target, test_size = ${ratio})`.replace(/^\s+/gm, '');
        return [code, Blockly.Python.ORDER_ATOMIC];
    };


// Define custom block for target variable
Blockly.Blocks['target_var'] = {
    init: function () {
        this.appendDummyInput('target_name')
            .appendField("Target Variable:")
            .appendField(new Blockly.FieldTextInput('column_name'), 'column_name')
        this.setOutput(true, "String");
        this.setColour(300);
        this.setTooltip("Input column name");
        this.setHelpUrl("");
    }
};

Blockly.Python['target_var'] = function(block) {
    var columnName = block.getFieldValue('column_name'); // Get the 'column_name' value from the block

    // Use the 'columnName' variable in your generated Python code
    var code = `target = df['${columnName}']`.replace(/^\s+/gm, '');
    return [code, Blockly.Python.ORDER_NONE];
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
        var code = imports + "model = " + model + "(n_neighbors=5)\n".replace(/^\s+/gm, '');
    }
    else {
        var code = imports + "model = " + model + "()\n".replace(/^\s+/gm, '');
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

    var readCsvBlock = block.getInputTargetBlock('TRAIN_DATA');
    if (readCsvBlock) {
        // Retrieve the generated Python code from the block
        var generatedCode = Blockly.Python.blockToCode(readCsvBlock)[0];

        // Now 'generatedCode' contains the Python code generated by the 'read_csv' block
        console.log('Generated Code:', generatedCode);
    } else {
        console.log('Block not found');
    }
    var readCsvBlock2 = block.getInputTargetBlock('MODEL');
    if (readCsvBlock2) {
        // Retrieve the generated Python code from the block
        var generatedCode2 = Blockly.Python.blockToCode(readCsvBlock2);

        console.log('Generated Code:', generatedCode2);
    } else {
        console.log('Block not found');
    }

    // Python code for data normalization using StandardScaler
    var code = `
    ${generatedCode}
    ${generatedCode2}
    model.fit(X_train, y_train)
    `.replace(/^\s+/gm, '')
    return code;
};

// custom block for implementing the model prediction 
Blockly.Blocks['predict_model'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Predict with Model")
      this.setOutput(true, 'Number'); 
      this.setColour(40);
      this.setTooltip("Predict using the model");
      this.setHelpUrl("");
    }
  };

// implement python code for model prediction 
Blockly.Python['predict_model'] = function (block) {
    var code = `
    y_pred = model.predict(X_test)`.replace(/^\s+/gm, '');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

// Define a custom block for evaluating the accuracy of regression models
Blockly.Blocks['evaluate_regression_model'] = {
init: function () {
    this.appendValueInput("PREDICTION")
        .setCheck("Number")
        .appendField("Evaluate Regression Model Accuracy");
    this.appendDummyInput()
        .appendField("Using")
        .appendField(new Blockly.FieldDropdown([["Mean Squared Error (MSE)", "mse"], ["R-squared (R²)", "r2"]]), "METRIC");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    // this.setOutput(true, "Number");
    this.setColour(40);
    this.setTooltip("Evaluate the accuracy of a regression model using Mean Squared Error (MSE) or R-squared (R²).");
    this.setHelpUrl("");
}
};

// implement regression model evaluation
Blockly.Python['evaluate_regression_model'] = function(block) {
    var metric = block.getFieldValue('METRIC');
    var readCsvBlock = block.getInputTargetBlock('PREDICTION');
    if (readCsvBlock) {
        // Retrieve the generated Python code from the block
        var generatedCode = Blockly.Python.blockToCode(readCsvBlock)[0];

        console.log('Generated Code:', generatedCode);
    } else {
        console.log('Block not found');
    }
    var imports = "from sklearn.metrics import mean_squared_error\nfrom sklearn.metrics import r2_score\n";
    if (metric === "mse") {
        var code = `${generatedCode}\n` + imports + "mse = mean_squared_error(y_test, y_pred)\nprint(f'Mean Squared Error on Test Data: {mse:.2f}')".replace(/^\s+/gm, '')
    }
    else {
        var code = `${generatedCode}\n` + imports + "r2 = r2_score(y_test, y_pred)\nprint(f'R-squared (R2) Error: {r2:.2f}')".replace(/^\s+/gm, '')
    }
    return code;
};

// Define a custom block for evaluating the performance of classification models
Blockly.Blocks['evaluate_classification_model'] = {
    init: function () {
        this.appendValueInput("PREDICTION")
            .setCheck("Number")
            .appendField("Evaluate Classification Model Accuracy");
        this.appendDummyInput()
            .appendField("Using")
            .appendField(new Blockly.FieldDropdown([["Accuracy Score", "accuracy"], ["Confusion Matrix", "confusion_matrix"]]), "METRIC");
        // this.setOutput(true, "Number");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(40);
        this.setTooltip("Evaluate the performance of a classification model using Accuracy Score or Confusion Matrix.");
        this.setHelpUrl("");
    }
};

// implement classification model evaluation
Blockly.Python['evaluate_classification_model'] = function(block) {
    var metric = block.getFieldValue('METRIC');
    var readCsvBlock = block.getInputTargetBlock('PREDICTION');
    if (readCsvBlock) {
        // Retrieve the generated Python code from the block
        var generatedCode = Blockly.Python.blockToCode(readCsvBlock)[0];

        console.log('Generated Code:', generatedCode);
    } else {
        console.log('Block not found');
    }
    var imports = "from sklearn.metrics import accuracy_score\nfrom sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay\n";
    if (metric === "accuracy") {
        var code = `${generatedCode}\n` + imports + "accuracy = accuracy_score(y_test, y_pred)\nprint(f'Accuracy Score: {accuracy:.2f}')".replace(/^\s+/gm, '')
    }
    else {
        var code = `${generatedCode}\n` + imports + "print('Confusion Matrix:')\nConfusionMatrixDisplay.from_predictions(y_test, y_pred)".replace(/^\s+/gm, '')
    }
    return code;
};

//Define the custom block that will process inputting the Penguin Dataset
Blockly.Blocks['Penguins Dataset'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Penguins Dataset");
        this.setOutput(true, "String"); // Change the output type to "String"
        this.setColour('#FFA500');
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
    this.setColour('#FFA500');
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
        this.setColour('#FFA500');
        this.setTooltip("Custom CSV input");
        this.setHelpUrl("");
    }
};

Blockly.Python['Custom Dataset'] = function(block) {
    var csv_file = block.getFieldValue('csv_file');
    var code = "'" + csv_file + "'".replace(/^\s+/gm, '');
    return [code, Blockly.Python.ORDER_ATOMIC];
};