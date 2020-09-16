# Neuk_mai_aok_assignment2

# Members

	Wutipong	Thabsuwan 		6030539621
	Thus		Karnjanapatchara 	6030276521
	Thadchet	Kittichotikul		6031026121
	Waragon 	Manothumsatit		6030518421
	Worawit 	Jitpakdeebodin		6030516121

# Things to be delivered:

1. Graphs showing the benchmarking results with the explanation of your experimental settings.
ทำการวัดผล 10 ครั้งและนำค่ามาหา average และนำไป plot
![](https://github.com/2110521-2563-1-Software-Architecture/Neuk_mai_aok_assignment2/blob/master/anwser_capture/response_time/1.png)
![](https://github.com/2110521-2563-1-Software-Architecture/Neuk_mai_aok_assignment2/blob/master/anwser_capture/response_time/2.png)
![](https://github.com/2110521-2563-1-Software-Architecture/Neuk_mai_aok_assignment2/blob/master/anwser_capture/response_time/3.png)
![](https://github.com/2110521-2563-1-Software-Architecture/Neuk_mai_aok_assignment2/blob/master/anwser_capture/response_time/4.png)

โดยเราจะได้ทำการเซ็ต Date.now() ก่อนและหลังการส่ง request (รูปข้างล่าง) เพื่อเป็นการเก็บช่วงระยะเวลาในการยิงหลังจากนั้นนำไปลบกันก็จะได้เป็น response time และ นำทุก response time มา plot เป็นกราฟแบบที่เห็นข้างบน
 ![](https://github.com/2110521-2563-1-Software-Architecture/Neuk_mai_aok_assignment2/blob/master/anwser_capture/benchmarking_code/1.png)


2. Discussion of the results why one method is better the other in which scenarios.

โดยรวมส่วนใหญ่ gRPC จะเร็วกว่า REST ในทุกๆกรณีสาเหตุมาจากวิธีการส่งข้อมูลของ gRPC นั้นใช้ http/2 ส่วน REST ส่งผ่าน http/1.1 และ gRPC นั้นมี protobuf ที่ส่งแบบ binary ซึ่งแตกต่างจาก REST ที่ส่งแบบ JSON ซึ่ง JSON นั้นมีขนาดใหญ่กว่าทำให้ส่งช้ากว่านั่นเอง

3. Comparison of the gRPC and REST API from the aspects of language neutral, ease of use, and performance.
- Language neutral: ทั้ง gRPC และ REST รองรับได้หลายภาษาแต่โดยส่วนใหญ่คนน่าจะคุ้นกับ REST มากกว่าเพราะ gRPC ค่อนข้างใหม่
- Ease of use: ความง่ายในการใช้ REST น่าจะใช้งานง่ายกว่าเพราะว่ามี comunity ที่ค่อนข้างเยอะทำห้ learning curve น้อยกว่า gRPC แต่ gRPC นั้นใช้บรรทัดในการ้ขียนค่อนข้างน้อย
- Performance: จากกราฟด้านบนจะเห็นได้อย่างชั้นเจนว่า gRPC นั้นเร็วกว่า REST เนื่องมากจากการที่ gRPC ส่งผ่าน HTTP/2

4. Does your results comply with the results in https://medium.com/@bimeshde/grpc-vs-rest-performance-simplifiedfd35d01bbd4? How?

ผลลัพธ์ที่ได้สอดคล้องเดียวกับ medium ที่ว่า gRPC นั้น performance ดีกว่า REST
