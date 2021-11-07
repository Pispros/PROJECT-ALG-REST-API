package service;

//import java.awt.List;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import metier.Personne;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

@WebService
public class ServiceSoap {
	private Connection con=null;
	private PreparedStatement st=null;
	private ResultSet rs=null; 
	
	public ServiceSoap(){
		try
	    {
	       Class.forName("com.mysql.jdbc.Driver");
	 	  con=DriverManager.getConnection("jdbc:mysql://localhost:3306/archilogiciel","root","");
	    }
	    catch(Exception e)
	    {
	    System.out.println(e.getMessage());
	    }
	}
	
	
	//methode pour lister les editeurs
	@WebMethod
	public ArrayList <Personne> listerEditeurs()
	{
		 ArrayList<Personne> liste= new ArrayList<Personne>();
	     try
	     {
	       st=con.prepareStatement("select * from users");
	       rs=st.executeQuery();
	       while(rs.next())
	         {
	         Personne p = new Personne();
	           p.setNom(rs.getString("nom"));
	           p.setPrenom(rs.getString("prenom"));
	           p.setLogin(rs.getString("login"));
	           p.setMdp(rs.getString("mdp"));
	           p.setAdmin(rs.getString("admin"));  

	           liste.add(p); 
	         }  
	     }
	     catch(Exception e)
	     {
	        System.out.println(e.getMessage());
	     }
	    return liste;

	}
	
	
	//pour lister les admins
	@WebMethod
	public ArrayList <Personne> listerAdmins()
	{
		 ArrayList<Personne> liste= new ArrayList<Personne>();
	     try
	     {
	       st=con.prepareStatement("select * from users where admin=0");
	       rs=st.executeQuery();
	       while(rs.next())
	         {
	         Personne p = new Personne();
	           p.setNom(rs.getString("nom"));
	           p.setPrenom(rs.getString("prenom"));
	           p.setLogin(rs.getString("login"));
	           p.setMdp(rs.getString("mdp"));
	           p.setAdmin(rs.getString("admin")); 

	           liste.add(p); 
	         }  
	     }
	     catch(Exception e)
	     {
	        System.out.println(e.getMessage());
	     }
	    return liste;

	}
	
	
	//ajouter user
	@WebMethod
	public void ajouterUser(Personne p) {
		System.out.println(p);
		try
		 {
			
		st = con.prepareStatement("insert into users (nom,prenom, login, mdp,admin) values(?,?,?,?,?)");
	
		st.setString(1,p.getNom());
		st.setString(2,p.getPrenom());
		st.setString(3,p.getLogin());
		st.setString(4,p.getMdp());
		st.setString(5,p.isAdmin());

	
		st.executeUpdate();
	  }

	  catch(Exception e)
	  {
	  System.out.println(e.getMessage());
	  System.out.println("echec");
	  System.out.println(p);
	  }
		
	}
	
	
	//supprimer editeur
	@WebMethod
	public void supprimerUser(Personne p)
	{
		try
		 {
		st = con.prepareStatement("delete from users where login = ?");
		st.setString(1,p.getLogin());

		st.executeUpdate();
	  }
	  catch(Exception e)
	  {
	  System.out.println(e.getMessage());
	  }

	}
	
	
	//modifier user
	@WebMethod
	public void modifUser(Personne p){
		try{
			st = con.prepareStatement("update users set nom=?, prenom=?, mdp=? where login = ?");
			st.setString(1,p.getNom());
			st.setString(2,p.getPrenom());
			st.setString(3,p.getMdp());
			st.setString(4,p.getLogin());
			
			st.executeUpdate();
		}
		catch(Exception e){
			System.out.println(e.getMessage());
		}
	}
	
	
	//nommer administrateur
	@WebMethod
	public void nommerAdmin(Personne p, int admin){
		try{
			st = con.prepareStatement("update users set admin=? where login = ?");
			st.setInt(1,admin);
			st.setString(2,p.getLogin());
			
			st.executeUpdate();
		}
		catch(Exception e){
			System.out.println(e.getMessage());
		}
	}
	
	
	//authentification 
	@WebMethod
	public boolean connexionUser(@WebParam(name="login")String login, @WebParam(name="mdp")String mdp){
		boolean connect = false;
		try
		 {
		st = con.prepareStatement("select login, mdp from users where login = ?");
		st.setString(1,login);

		rs=st.executeQuery();
		rs.next();

		if(rs.getString(1).equals(login)){
			if(rs.getString(2).equals(mdp)){
				connect = true;
			}
		}
	  }
	  catch(Exception e)
	  {
	  System.out.println(e.getMessage());
	  }
		return connect;
	}
}