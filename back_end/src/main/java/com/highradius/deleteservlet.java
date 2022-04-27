package com.highradius;

import java.io.IOException;
import java.sql.Connection;
//import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

@WebServlet("/deleteservlet")
public class deleteservlet extends HttpServlet {
	private static final long serialVersionUID = 4L;

   
    public deleteservlet() {
        super();
        // TODO Auto-generated constructor stub
    }
    Statement stmt = null;
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			Connection con = DBConnection.createConnect();
			//Creating an PreparedStatement to edit data into an database

		      System.out.println(request.getReader());

		      stmt = con.createStatement();
		      
		      
		      JsonObject data = new Gson().fromJson(request.getReader(), JsonObject.class);
		      System.out.println(data);

		      //Creating an PreparedStatement to edit data into an database
		      JsonArray deleting_id = data.get("ids").getAsJsonArray();
		      System.out.println(deleting_id);

		      for (int i = 0; i < deleting_id.size(); i++) {

		        int idd = deleting_id.get(i).getAsInt();

		        System.out.println(idd);

		        PreparedStatement ps = con.prepareStatement("UPDATE winter_internship SET is_deleted=1 where sl_no=?");
		        ps.setInt(1,idd);

		        System.out.println(ps);
		        ps.executeUpdate();

		        System.out.println("A row is deleted");

		      }

		      


		    } catch (Exception e) {
		      e.printStackTrace();
		    }
		
		response.getWriter().write("DELETED");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}