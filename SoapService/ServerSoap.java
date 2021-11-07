import javax.xml.ws.Endpoint;

import service.ServiceSoap;

public class ServerSoap 
{
	public static void main(String[] args) 
	{
		String url = "http://localhost:8787/"; //Accesible qu'en localhost ce qui n'est pas normal
		//Remplacer localhost par 0.0.0.0 pour qu'il soit accesible de n'importe ou
		Endpoint.publish(url, new ServiceSoap());
		System.out.println("Web service déployé sur "+ url);
	}

}
