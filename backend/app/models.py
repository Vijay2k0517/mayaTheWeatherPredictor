from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    preferred_language = Column(String, default="both")
    queries = relationship("Query", back_populates="user")

class Query(Base):
    __tablename__ = "queries"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    city = Column(String, index=True)
    query_text = Column(String)
    response_text = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    user = relationship("User", back_populates="queries")

class WeatherLog(Base):
    __tablename__ = "weather_logs"
    id = Column(Integer, primary_key=True, index=True)
    city = Column(String, index=True)
    temp = Column(Float)
    humidity = Column(Float)
    condition = Column(String)
    date = Column(DateTime, default=datetime.utcnow)

class UserPreference(Base):
    __tablename__ = "user_preferences"
    id = Column(String, primary_key=True, index=True)
    language = Column(String, default="en")
    notification_time = Column(String, default="08:00")
    voice_enabled = Column(Integer, default=1)  # SQLite doesn't have boolean
    assistant_name = Column(String, default="Maya")
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
