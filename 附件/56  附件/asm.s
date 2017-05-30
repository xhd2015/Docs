.code16gcc
START_SEG = 0x7c0
.text
ljmp $START_SEG,$NEXT_ADDR		#设置cs:eip指向下一跳指令；ljmp的实际作用就是设置cs和eip的值，如果使用ljmp，cs可能不指向0x7c0这个段
NEXT_ADDR:						#定义一个地址
mov $START_SEG,%ax
mov %ax,%ds		
mov %ax,%ss
mov $1024,%sp			#设置ds,ss,esp， 其中esp指向了1024，也就是将堆栈的栈顶设置为0x7c00后面的第二个扇区末尾，这样堆栈第二个扇区就是堆栈的空间，而第一个扇区存放代码
mov $0xb800,%ax
mov %ax,%es				#设置es = 0xb800,即指向屏幕上显示字符的区域的段，这个区域中每个显示字符占有两个字节，第一个字节表示要显示的字符，第二个字节表示显示的颜色、背景、前景等

movb $'h',%al
movb %al,%es:0			#显示h

movb $'e',%al
movb %al,%es:2			#显示e

movb $'l',%al
movb %al,%es:4			#显示l

movb $'l',%al
movb %al,%es:6			#显示l

movb $'o',%al
movb %al,%es:8			#显示o

movb $' ',%al
movb %al,%es:10			#显示空格

movb $'w',%al
movb %al,%es:12			#显示w

movb $'o',%al
movb %al,%es:14			#显示o

movb $'r',%al
movb %al,%es:16			#显示r

movb $'l',%al
movb %al,%es:18			#显示l

movb $'d',%al
movb %al,%es:20			#显示d

jmp .					#死循环
.org 510
.word 0xaa55			#设置扇区的最后两个字节为0xaa55,表示可以用于启动
