#!/usr/bin/python
#coding:utf-8
# a python version of websocket server 
# just in case
import tornado.web
import tornado.ioloop
import tornado.websocket

class SocketHandler(tornado.websocket.WebSocketHandler):
    clients = set()

    def open(self):
        self.write_message(str(id(self)) + ' has joined')
        SocketHandler.clients.add(self)
 
    def on_message(self, msg):
        print "received: " + msg

    def on_close(self):
        SocketHandler.send_to_all(str(id(self)) + ' has left')
        SocketHandler.clients.remove(self)

if __name__ == '__main__':
    app = tornado.web.Application([
        ('/', SocketHandler),
    ])
    app.listen(8080)
    print "wss start"
    tornado.ioloop.IOLoop.instance().start()

