using UnityEngine;
using System.Collections;
using WebSocketSharp;
using System.Threading;
using SimpleJson;

public class NewBehaviourScript : MonoBehaviour {
	private WebSocket ws;
	private int[] move = {0,0,0};
	// Use this for initialization
	void Start () {
		ws = new WebSocket("ws://echo.websocket.org");

        ws.OnOpen += OnOpenHandler;
        ws.OnMessage += OnMessageHandler;
        ws.OnClose += OnCloseHandler;

        ws.ConnectAsync(); 
	}
	private void OnOpenHandler(object sender, System.EventArgs e) {
        Debug.Log("WebSocket connected!");
        Thread.Sleep(3000);
    }

    private void OnMessageHandler(object sender, MessageEventArgs e) {
        // Debug.Log("WebSocket server said: " + e.Data);
        SimpleJSON.JSONNode jn = SimpleJSON.JSON.Parse(e.Data);
        SimpleJSON.JSONClass jc = jn.AsObject;
        if (jc["motion"].Value == "translate") {
        	move[0] += jc["x"].AsInt;
        	move[1] += jc["y"].AsInt;
        	move[2] += jc["z"].AsInt;
        }
    }

    private void OnCloseHandler(object sender, CloseEventArgs e) {
        Debug.Log("WebSocket closed with reason: " + e.Reason);
    }

    private void OnSendComplete(bool success) {
        // Debug.Log("Message sent successfully? " + success);
    }

	// Update is called once per frame
	void Update () {
		transform.Translate(move[0], move[1], move[2]);
		for (int i=0;i<3;i++) move[i] = 0;
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

