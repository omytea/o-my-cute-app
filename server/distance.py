# function used to calculate the distance between two lines
# might be useless
points = [(4,0,0), (0,3,0), (4,3,1), (4,3,-4)]

def points2parameters(points):
	def _point2parameters(i):
		xyz = [map(lambda a: a[j], points) for j in range(len(points[0]))]
		return sum(map(lambda a: (a[i[0]] - a[i[1]]) * (a[i[2]] - a[i[3]]), xyz))
	return _point2parameters

ps = points2parameters(points)
p = map(ps, [[1,0,1,0],[1,0,3,2],[0,1,0,2],[1,0,3,2],[3,2,3,2],[0,2,3,2]])
print p
t = -(p[2]*p[3] + p[5]*p[0]) / float(p[1]*p[3] + p[4]*p[0])
s = (p[2] + p[1] * t) / float(p[0])
print t, s