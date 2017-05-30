//这是一个c语言程序
__asm__(
".code16gcc	\n\t"
"START_SEG = 0x7c0 \n\t"
".text	\n\t"
"ljmp $START_SEG,$NEXT_ADDR		#设置cs:eip指向下一跳指令；ljmp的实际作用就是设置cs和eip的值，如果使用ljmp，cs可能不指向0x7c0这个段 \n\t"
"NEXT_ADDR:						#定义一个地址 \n\t"
"mov $START_SEG,%ax	\n\t"
"mov %ax,%ds	\n\t"	
"mov %ax,%ss	\n\t"
"mov $1024,%sp			#设置ds,ss,esp， 其中esp指向了1024，也就是将堆栈的栈顶设置为0x7c00后面的第二个扇区末尾，这样堆栈第二个扇区就是堆栈的空间，而第一个扇区存放代码 \n\t"
"mov $0xb800,%ax	\n\t"
"mov %ax,%es				#设置es = 0xb800,即指向屏幕上显示字符的区域的段，这个区域中每个显示字符占有两个字节，第一个字节表示要显示的字符，第二个字节表示显示的颜色、背景、前景等 \n\t"

"movb $'h',%al	\n\t"
"movb %al,%es:0			#显示h \n\t"

"movb $'e',%al	\n\t"
"movb %al,%es:2			#显示e \n\t"

"movb $'l',%al	\n\t"
"movb %al,%es:4			#显示l \n\t"

"movb $'l',%al	\n\t"
"movb %al,%es:6			#显示l \n\t"

"movb $'o',%al	\n\t"
"movb %al,%es:8			#显示o \n\t"

"movb $' ',%al	\n\t"
"movb %al,%es:10			#显示空格 \n\t"

"movb $'w',%al	\n\t"
"movb %al,%es:12			#显示w \n\t"

"movb $'o',%al	\n\t"
"movb %al,%es:14			#显示o \n\t"

"movb $'r',%al	\n\t"
"movb %al,%es:16			#显示r \n\t"

"movb $'l',%al	\n\t"
"movb %al,%es:18			#显示l \n\t"

"movb $'d',%al	\n\t"
"movb %al,%es:20			#显示d \n\t"

"jmp .					#死循环 \n\t"
".org 510 \n\t"
".word 0xaa55			#设置扇区的最后两个字节为0xaa55,表示可以用于启动 \n\t"
);//内联汇编结束
