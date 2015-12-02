#!/usr/bin/python
#coding:utf-8
import tornado.web
import tornado.ioloop
import tornado.websocket
import tornado.escape

# static page for test
class IndexHandler(tornado.web.RequestHandler):
  def get(self):
    self.render("fixture/index.html")

class SocketHandler(tornado.websocket.WebSocketHandler):
    clients = set()
    view = set()

    def open(self):
      pass
 
    def on_message(self, msg):
      jsMsg = tornado.escape.json_decode(msg)
      print 'receive', self, msg
      if jsMsg["act"] == "register":
        self.clientRegister(jsMsg)
      if jsMsg["act"] == "move":
        SocketHandler.sendMotionMsg(jsMsg)

    def clientRegister(self, msg):
      if msg["client"] == "phone":
        SocketHandler.clients.add(self)
      else:
        SocketHandler.view.add(self)

    @classmethod
    def sendMotionMsg(cls, msg):
      map(lambda v: v.write_message(msg), cls.view)
      print 'send', cls.view,  msg

    def on_close(self):
      if self in SocketHandler.clients:
        SocketHandler.clients.remove(self)
      else:
        SocketHandler.view.remove(self)

if __name__ == '__main__':
    app = tornado.web.Application([
        ('/', SocketHandler),
        ('/home', IndexHandler),
    ])
    app.listen(8080)
    print "wss start"
    tornado.ioloop.IOLoop.instance().start()

