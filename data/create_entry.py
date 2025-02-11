import json
import sys
import boto3
from jsonschema import validate, ValidationError

# Load JSON Schema
with open("producer_schema.json", "r") as schema_file:
    schema = json.load(schema_file)

def insert_producer_data(json_file_path):
    # Load JSON data
    try:
        with open(json_file_path, "r") as file:
            data = json.load(file)
    except Exception as e:
        print(f"❌ Error loading JSON file: {e}")
        sys.exit(1)

    # Validate JSON against schema
    try:
        validate(instance=data, schema=schema)
        print("✅ JSON is valid.")
    except ValidationError as e:
        print(f"❌ JSON validation error: {e.message}")
        sys.exit(1)

    # Insert into DynamoDB
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table("Producers")

    producer_npn = data["producerNPN"]
    carrier_name = data["carrier"]

    for product in data["products"]:
        product_cusip = product["CUSIP"]
        partition_key = producer_npn
        sort_key = f"{carrier_name}#{product_cusip}"

        item = {
            "ProducerNPN": partition_key,
            "Carrier#ProductCUSIP": sort_key,
            "Carrier": carrier_name,
            "ProductDetails": product
        }
        table.put_item(Item=item)
        print(f"✅ Inserted: {sort_key}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 create_entry.py path_to_json.json")
        sys.exit(1)

    insert_producer_data(sys.argv[1])
