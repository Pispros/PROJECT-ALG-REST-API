package metier;

public class Personne {
	private String nom;
	private String prenom;
	private String login;
	private String mdp;
	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getMdp() {
		return mdp;
	}

	public void setMdp(String mdp) {
		this.mdp = mdp;
	}
	private String admin;
	
	public Personne(){
		
	}
	
	public Personne(String nom, String prenom, String admin) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.admin = admin;
	}
	
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public String isAdmin() {
		return admin;
	}
	public void setAdmin(String admin) {
		this.admin = admin;
	}
	
}
