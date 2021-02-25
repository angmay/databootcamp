import datetime as dt
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

from flask import Flask, jsonify


#SQLAlchemy 
engine = create_engine("sqlite:///Resources/hawaii.sqlite")
print("file found!")
Base = automap_base()
Base.prepare(engine, reflect=True)
inspector = inspect(engine)
print(inspector.get_table_names())
measurement = Base.classes.measurement
station = Base.classes.station


#Flask 
app = Flask (__name__)

@app.route("/")
def main():    
    return (
        f"Welcome to the Climate App! <br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/<start><br/>"
        f"/api/v1.0/<start>/<end><br/>"
    )


@app.route("/api/v1.0/precipitation")
def precipitation(): 
    session = Session(engine)
    results = session.query(measurement.date, measurement.prcp).all()
    
    prcp_data = {}
    for date, prcp in results: 
        prcp_data[f"{date}"] = prcp
    session.close()

    return jsonify(prcp_data)


@app.route("/api/v1.0/stations")
def list_station(): 
    session = Session(engine)
    results = session.query(station.station).distinct()
    
    stationlist = []
    for station_name in results: 
        stationlist.append(station_name)
    session.close()

    station_unique = {}
    station_unique["List of Stations"] = stationlist

    return jsonify(stationlist)


@app.route("/api/v1.0/tobs")
def tobs(): 
    session = Session(engine)
    results = session.query(measurement.station, func.count(measurement.tobs)).group_by(measurement.station).order_by(func.count(measurement.tobs).desc()).limit(1)

    for station, count in results: 
        most_active = station

    data = session.query(measurement.station, measurement.date, measurement.tobs).filter(measurement.station == most_active).order_by(measurement.date.desc()).limit(365)

    station_data = {}
    for station, date, tobs in data: 
        station_data[f"{date}"] = tobs
        
    session.close()

    return jsonify(station_data)


@app.route("/api/v1.0/<start>")
def start_app(start):

    session = Session(engine)
    results = session.query(func.max(measurement.tobs), func.min(measurement.tobs), func.avg(measurement.tobs)).filter(measurement.date >= start).all()
    
    temp = {}
    for max_temp, min_temp, avg_temp in results: 
        temp["Maximum Temperature"] = round(max_temp,2)
        temp["Minimum Temperature"] = round(min_temp,2)
        temp["Average Temperature"] = round(avg_temp,2)
        
    session.close()

    return jsonify(temp)

@app.route("/api/v1.0/<start>/<end>")
def end_app(start, end):

    session = Session(engine)
    results = session.query(func.max(measurement.tobs), func.min(measurement.tobs), func.avg(measurement.tobs)).filter(measurement.date >= start, measurement.date <= end).all()
    
    temp = {}
    for max_temp, min_temp, avg_temp in results: 
        temp["Maximum Temperature"] = round(max_temp,2)
        temp["Minimum Temperature"] = round(min_temp,2)
        temp["Average Temperature"] = round(avg_temp,2)
        
    session.close()

    return jsonify(temp)



if __name__ == "__main__":
    app.run(debug=True)
