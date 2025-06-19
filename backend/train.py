import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.ensemble import RandomForestClassifier
import joblib

df = pd.read_csv("https://archive.ics.uci.edu/ml/machine-learning-databases/wine-quality/winequality-red.csv", sep=';')
print(df[df['quality'] == 8].sample(3))

# here if quality > 6, we set it to good, else bad.
df['target'] = (df['quality'] >=6).astype(int)
X = df.drop(['quality', 'target'], axis =1)
y = df['target']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier()
model.fit(X_train, y_train)

joblib.dump(model, './backend/model.pkl')
y_pred = model.predict(X_test)

print("Accuracy: ", accuracy_score(y_test, y_pred))
