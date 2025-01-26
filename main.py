import pandas as pd
import json

# Read JSON data from a file
with open('data.json', 'r') as file:
    data = json.load(file)

# Prepare data for the Excel sheet
rows = []
for category in data:
    category_id = category["_id"]
    category_name = category["name"]
    
    # Loop over subproducts
    for product in category["subproducts"]:
        product_id = product["_id"]
        product_name = product["name"]
        rows.append([category_name, product_name, product_id])

# Create a DataFrame
df = pd.DataFrame(rows, columns=["Category Name", "Product Name", "Subproduct ID"])

# Write to an Excel file
df.to_excel("category_product_subproducts.xlsx", index=False, engine='openpyxl')

print("Excel file has been created: category_product_subproducts.xlsx")
