using UnityEngine;
using System.Collections;
using WebSocketSharp;
using System.Threading;
using SimpleJson;

public class NewBehaviourScript : MonoBehaviour {
	private WebSocket ws;
	private float[] translate = {0,0,0};
	private float[] rotate = {0,0,0};
	// private string serverIp = "ws://echo.websocket.org";
	private string serverIp = "ws://192.168.1.102:8080";
	// Use this for initialization
	void Start () {
		ws = new WebSocket(serverIp);

        ws.OnOpen += OnOpenHandler;
        ws.OnMessage += OnMessageHandler;
        ws.OnClose += OnCloseHandler;

        ws.ConnectAsync(); 
	}
	private void OnOpenHandler(object sender, System.EventArgs e) {
        Debug.Log("WebSocket connected!" + serverIp);
        Thread.Sleep(3000);
        ws.SendAsync("{\"act\":\"register\",\"client\":\"view\"}", OnSendComplete);
    }

    private void OnMessageHandler(object sender, MessageEventArgs e) {
        Debug.Log("WebSocket server said: " + e.Data);
        SimpleJSON.JSONNode jn = SimpleJSON.JSON.Parse(e.Data);
        SimpleJSON.JSONClass jc = jn.AsObject;
        if (jc["act"].Value == "move") {
        	translate[0] += jc["translate"][0].AsFloat;
        	translate[1] += jc["translate"][1].AsFloat;
        	translate[2] += jc["translate"][2].AsFloat;
        	rotate[0] += jc["rotate"][0].AsFloat;
        	rotate[1] += jc["rotate"][1].AsFloat;
        	rotate[2] += jc["rotate"][2].AsFloat;
        }
    }

    private void OnCloseHandler(object sender, CloseEventArgs e) {
        Debug.Log("WebSocket closed with reason: " + e.Reason);
    }

    private void OnSendComplete(bool success) {
        Debug.Log("Message sent successfully? " + success);
    }

	// Update is called once per frame
	void Update () {
		transform.Translate(translate[0], translate[1], translate[2]);
		transform.Rotate(rotate[0], rotate[1], rotate[2]);
		for (int i=0;i<3;i++) translate[i] = 0;
		for (int i=0;i<3;i++) rotate[i] = 0;
		if (Input.GetKey(KeyCode.UpArrow))  {
			ws.SendAsync("{\"motion\":\"translate\", \"x\":0, \"y\":1, \"z\":0}", OnSendComplete);
		}
		if (Input.GetKey(KeyCode.DownArrow))  {
			ws.SendAsync("{\"motion\":\"translate\", \"x\":0, \"y\":-1, \"z\":0}", OnSendComplete);
		}
		if (Input.GetKey(KeyCode.LeftArrow))  {
			ws.SendAsync("{\"motion\":\"translate\", \"x\":-1, \"y\":0, \"z\":0}", OnSendComplete);
		}
		if (Input.GetKey(KeyCode.RightArrow))  {
			ws.SendAsync("{\"motion\":\"translate\", \"x\":1, \"y\":0, \"z\":0}", OnSendComplete);
		}
	}
}

