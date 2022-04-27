package com.highradius;
import java.sql.*;

public class DBConnection {
	public static Connection createConnect() {
		Connection con = null;
		String url = "jdbc:mysql://localhost:3306/grey_goose";
		String uname = "root";
		String pass = "root";
		
		try {
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
			}
			catch (ClassNotFoundException e)
			{
				e.printStackTrace();
			}
			con = DriverManager.getConnection(url, uname, pass);
			System.out.println("Post establishing a DB connection - " +con);
			
		}
		catch(SQLException e)
		{
			System.out.println("Error Occurred");
			e.printStackTrace();
		}
		return con;
		
	}

}
