package com.highradius;

import java.io.IOException;
import java.sql.Connection;
//import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
/**
 * Servlet implementation class EditServlet
 */
@WebServlet("/EditServlet")
public class editservlet extends HttpServlet {
	private static final long serialVersionUID = 3L;

   
    public editservlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			Connection con = DBConnection.createConnect(); 
			System.out.println(request.getReader());
            
            
            System.out.println(request.getParameter("cust_payment_terms")); 
            JsonObject data = new Gson().fromJson(request.getReader(), JsonObject.class);

            int sl_no = data.get("id").getAsInt();
            String cust_payment_terms = data.get("cust_payment_terms").getAsString();
            String invoice_currency = data.get("invoice_currency").getAsString();

            System.out.println(sl_no);
            System.out.println(cust_payment_terms);
            
            PreparedStatement ps = con.prepareStatement("UPDATE winter_internship SET cust_payment_terms=\"" + cust_payment_terms + "\",invoice_currency=\"" + invoice_currency + "\" WHERE Sl_no=\"" + sl_no + "\"");
            System.out.println(ps);
            ps.executeUpdate();

		} catch(Exception e) {
			e.printStackTrace();
		}
		
		response.getWriter().write("UPDATED");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}