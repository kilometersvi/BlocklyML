def get_modules():
    # import necessary libraries within the function such that locals() contains only these modules

    import pandas as pd
    from sklearn.preprocessing import StandardScaler
   
   # wildcards not allowed in importing within functions; this may need specific updating for use in all ggplot themes offered to the user
    from plotnine import ggplot, aes, geom_point, geom_bar, theme_bw, theme_xkcd, theme_matplotlib, theme_seaborn, theme_gray, theme_classic, theme_minimal
    
    from sklearn.model_selection import train_test_split
    from sklearn.linear_model import LinearRegression
    from sklearn.tree import DecisionTreeRegressor
    from sklearn.ensemble import RandomForestRegressor
    from sklearn.linear_model import LogisticRegression
    from sklearn.neighbors import KNeighborsClassifier
    from sklearn.tree import DecisionTreeClassifier
    from sklearn.metrics import mean_squared_error
    from sklearn.metrics import r2_score
    from sklearn.metrics import accuracy_score
    from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay

    return locals()
