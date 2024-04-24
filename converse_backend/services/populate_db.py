from sqlalchemy import create_engine, MetaData
from sqlalchemy import Table, Column, String, Numeric, Date, ForeignKey
from sqlalchemy import insert
from sqlalchemy import text

import json


class PopulateDB:

    def __init__(self):
        self.engine = create_engine(
            "postgresql://postgres:password@localhost:5432/postgres"
        )
        self.metadata_obj = MetaData()

        self.metadata_obj.reflect(bind=self.engine)

    def getEngine(self):
        return self.engine

    def list_tables(self):
        table_names = []
        for table in self.metadata_obj.tables.values():
            # print(table.name)
            table_names.append(table.name)
        return table_names

    def get_table_info(self, table_name):
        table = self.metadata_obj.tables[table_name]
        columns = []
        for column in table.columns:
            column_info = {
                "name": column.name,
                "type": str(column.type),
                "nullable": column.nullable,
                "description": column.comment if column.comment else "",
            }
            columns.append(column_info)

        foreign_keys = []
        for fk in table.foreign_keys:
            print("Reached 30: ", table_name)
            fk_info = {
                "column": fk.parent.name,
                "references": {
                    "table": fk.target_fullname.split(".")[0],
                    "column": fk.column.name,
                },
            }
            foreign_keys.append(fk_info)

        return {
            "table_name": table_name,
            "columns": columns,
            "foreign_keys": foreign_keys,
        }

    def get_all_table_info(self):
        schema_list = []
        for table_name in self.metadata_obj.tables.keys():
            table = self.metadata_obj.tables[table_name]
            columns = []
            for column in table.columns:
                column_info = {
                    "name": column.name,
                    "type": str(column.type),
                    "nullable": column.nullable,
                    "default": str(column.default),
                    "comment": column.comment,
                }
                columns.append(column_info)
            foreign_keys = []
            for fk in table.foreign_keys:
                fk_info = {
                    "column": fk.parent.name,
                    "references": {
                        "table": fk.target_fullname.split(".")[0],
                        "column": fk.column.name,
                    },
                }
                foreign_keys.append(fk_info)
            schema_list.append(
                {
                    "table_name": table_name,
                    "columns": columns,
                    "foreign_keys": foreign_keys,
                }
            )
        schema_json = json.dumps(schema_list, indent=4)

        schema_json = {
            "tables": [
                {
                    "table_name": "car_brands",
                    "columns": [
                        {
                            "name": "brand",
                            "type": "VARCHAR(30)",
                            "nullable": False,
                            "default": "None",
                            "comment": None,
                        },
                        {
                            "name": "country",
                            "type": "VARCHAR(50)",
                            "nullable": False,
                            "default": "None",
                            "comment": None,
                        },
                    ],
                    "foreign_keys": [],
                },
                {
                    "table_name": "car_models",
                    "columns": [
                        {
                            "name": "model",
                            "type": "VARCHAR(50)",
                            "nullable": False,
                            "default": "None",
                            "comment": None,
                        },
                        {
                            "name": "brand",
                            "type": "VARCHAR(30)",
                            "nullable": False,
                            "default": "None",
                            "comment": None,
                        },
                    ],
                    "foreign_keys": [
                        {
                            "column": "brand",
                            "references": {"table": "car_brands", "column": "brand"},
                        }
                    ],
                },
                {
                    "table_name": "customers",
                    "columns": [
                        {
                            "name": "name",
                            "type": "VARCHAR(50)",
                            "nullable": False,
                            "default": "None",
                            "comment": None,
                        },
                        {
                            "name": "country",
                            "type": "VARCHAR(50)",
                            "nullable": False,
                            "default": "None",
                            "comment": None,
                        },
                    ],
                    "foreign_keys": [],
                },
                {
                    "table_name": "sales",
                    "columns": [
                        {
                            "name": "customer",
                            "type": "VARCHAR(50)",
                            "nullable": False,
                            "default": "None",
                            "comment": None,
                        },
                        {
                            "name": "car_model",
                            "type": "VARCHAR(50)",
                            "nullable": False,
                            "default": "None",
                            "comment": None,
                        },
                        {
                            "name": "sale_date",
                            "type": "DATE",
                            "nullable": False,
                            "default": "None",
                            "comment": None,
                        },
                        {
                            "name": "price",
                            "type": "NUMERIC(10, 2)",
                            "nullable": False,
                            "default": "None",
                            "comment": None,
                        },
                    ],
                    "foreign_keys": [
                        {
                            "column": "car_model",
                            "references": {"table": "car_models", "column": "model"},
                        },
                        {
                            "column": "customer",
                            "references": {"table": "customers", "column": "name"},
                        },
                    ],
                },
            ]
        }

        return schema_json

    def execute_sql_query(self, query=""):
        connection = self.engine.connect()
        # sql_query = "SELECT * FROM car_brands;"
        # result = self.engine.execute(sql_query)
        result = connection.execute(text(query))
        rows = result.fetchall()
        query_result = []
        for row in rows:
            query_result.append(row)
        return query_result

    def create_tables(self):
        table_name = "car_brands"
        car_brands_table = Table(
            table_name,
            self.metadata_obj,
            Column("brand", String(30), primary_key=True),
            Column("country", String(50), nullable=False),
        )
        table_name = "car_models"
        car_models_table = Table(
            table_name,
            self.metadata_obj,
            Column("model", String(50), primary_key=True),
            Column("brand", String(30), ForeignKey("car_brands.brand"), nullable=False),
        )
        table_name = "customers"
        customers_table = Table(
            table_name,
            self.metadata_obj,
            Column("name", String(50), primary_key=True),
            Column("country", String(50), nullable=False),
        )
        table_name = "sales"
        sales_table = Table(
            table_name,
            self.metadata_obj,
            Column(
                "customer", String(50), ForeignKey("customers.name"), nullable=False
            ),
            Column(
                "car_model", String(50), ForeignKey("car_models.model"), nullable=False
            ),
            Column("sale_date", Date, nullable=False),
            Column("price", Numeric(10, 2), nullable=False),
        )

        self.metadata_obj.create_all(self.engine)

        self.insert_car_brands(car_brands_table)
        self.insert_car_models(car_models_table)
        self.insert_customer_models(customers_table)
        self.insert_sales_models(sales_table)

    def insert_car_brands(self, car_brands_table):
        rows = [
            {"brand": "Citroen", "country": "France"},
            {"brand": "Hyundai", "country": "South Korea"},
            {"brand": "Jeep", "country": "USA"},
            {"brand": "Renault", "country": "France"},
            {"brand": "Volvo", "country": "German"},
        ]
        for row in rows:
            stmt = insert(car_brands_table).values(**row)
            with self.engine.connect() as connection:
                cursor = connection.execute(stmt)
                connection.commit()

    def insert_car_models(self, car_models_table):
        rows = [
            {"model": "C3", "brand": "Citroen"},
            {"model": "C4", "brand": "Citroen"},
            {"model": "Creta", "brand": "Hyundai"},
            {"model": "HB20", "brand": "Hyundai"},
            {"model": "Santa Fé", "brand": "Hyundai"},
            {"model": "Tucson", "brand": "Hyundai"},
            {"model": "Compass", "brand": "Jeep"},
            {"model": "Renegade", "brand": "Jeep"},
            {"model": "Captur", "brand": "Renault"},
            {"model": "Duster", "brand": "Renault"},
            {"model": "Sandero", "brand": "Renault"},
            {"model": "V60", "brand": "Volvo"},
        ]
        for row in rows:
            stmt = insert(car_models_table).values(**row)
            with self.engine.connect() as connection:
                cursor = connection.execute(stmt)
                connection.commit()

        # Use engine to execute a SELECT command
        with self.engine.connect() as connection:
            cursor = connection.exec_driver_sql("SELECT * FROM car_models")
            print(cursor.fetchall())

    def insert_customer_models(self, customers_table):
        rows = [
            {"name": "Antony", "country": "Brazil"},
            {"name": "Darcy", "country": "France"},
            {"name": "Karl", "country": "German"},
            {"name": "Kim", "country": "South Korea"},
            {"name": "Lee", "country": "South Korea"},
            {"name": "Manon", "country": "France"},
            {"name": "Mark", "country": "USA"},
        ]
        for row in rows:
            stmt = insert(customers_table).values(**row)
            with self.engine.connect() as connection:
                cursor = connection.execute(stmt)
                connection.commit()

    def insert_sales_models(self, sales_table):
        rows = [
            {
                "customer": "Antony",
                "car_model": "Renegade",
                "sale_date": "2023-07-01",
                "price": 1000.00,
            },
            {
                "customer": "Darcy",
                "car_model": "Sandero",
                "sale_date": "2023-08-01",
                "price": 1500.00,
            },
            {
                "customer": "Karl",
                "car_model": "C3",
                "sale_date": "2023-07-13",
                "price": 2000.00,
            },
            {
                "customer": "Kim",
                "car_model": "Santa Fé",
                "sale_date": "2023-08-04",
                "price": 2500.00,
            },
            {
                "customer": "Lee",
                "car_model": "Tucson",
                "sale_date": "2023-07-25",
                "price": 1000.00,
            },
            {
                "customer": "Manon",
                "car_model": "Compass",
                "sale_date": "2023-08-01",
                "price": 1200.00,
            },
            {
                "customer": "Mark",
                "car_model": "HB20",
                "sale_date": "2023-08-09",
                "price": 3000.00,
            },
        ]
        for row in rows:
            stmt = insert(sales_table).values(**row)
            with self.engine.connect() as connection:
                cursor = connection.execute(stmt)
                connection.commit()


if __name__ == "__main__":
    populateDb = PopulateDB()
    populateDb.create_tables()
