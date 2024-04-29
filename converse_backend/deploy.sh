#!/bin/bash

dockerize -wait tcp://postgresql-db-service:5432 -timeout 1m

python main.py
