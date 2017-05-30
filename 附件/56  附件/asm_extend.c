
extern "C" void printStr(const char *ch);//声明一个打印字符串的函数
extern "C" void printHelloWorld();

__asm__(
".code16gcc	\n\t"
"START_SEG = 0x7c0 \n\t"
".text	\n\t"
"ljmp $START_SEG,$NEXT_ADDR	\n\t"
"NEXT_ADDR:		\n\t"
"mov $START_SEG,%ax	\n\t"
"mov %ax,%ds	\n\t"	
"mov %ax,%ss	\n\t"
"mov $1024,%sp	\n\t"
"mov $0xb800,%ax	\n\t"
"mov %ax,%es	\n\t"
"call	_printHelloWorld \n\t"	//调用printHelloWorld函数
"jmp .					\n\t"
);

void printHelloWorld()
{
	char str[]={"hello world"};
	printStr(str);
}

void printStr(const char *ch)
{
	const char *p=ch;
	int i=0;
	while(*p)
	{
		__asm__ __volatile__(
			"mov %%al,%%es:(%%bx) \n\t"
			://输出列表为空
			:"a"(*p),"b"(i)
			:"memory"
		);
		p++;
		i+=2;
	}
}

__asm__(
".org 510 \n\t"
".word 0xaa55 	\n\t"
);
