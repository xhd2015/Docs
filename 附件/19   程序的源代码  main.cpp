#define _CRT_SECURE_NO_WARNINGS

#include <stdio.h>
#include <time.h>
#include <math.h>
#include <stdlib.h>
#include <ctype.h>

//�������һ�����֣���һ�ж�ȡ���룬������������������룬����ʼ�µ�һ��

int main()
{
	srand(time(NULL));
	int n = 20;//20 ���ַ���Ϊһ��
	int *a = (int*)malloc(sizeof(int)*n);
	while (1) 
	{
		for (int i = 0;i != n;i++)
		{
			do {
				a[i] = rand() % 127;
			} while (!isprint(a[i]));
			printf("%c", a[i]);
		}
		printf("\n");
		int cur = 0, inputchar;
		long long startTime = time(NULL), endTime;
		while (cur != n)
		{
			
				scanf("%c", &inputchar);
				if ((inputchar & 0x000000ff) == '\n' || (inputchar & 0x000000ff == '\a'))
					continue;
			//printf("==debug:inputchar=%x,a[%d]=%x\n", inputchar & 0x000000ff, cur, a[cur] & 0x000000ff);
			if( (inputchar&0x000000ff) != (a[cur]&0x000000ff))
			{
				printf("\nerror cur=%d,char=%c,yours=%c,come again\n", cur, a[cur],inputchar);
				for (int i = 0;i != n;i++)
					putchar(a[i]);
				putchar('\n');
				for (int i = 0;i != cur;i++)
					putchar(a[i]);
				while (getchar() != '\n');
			}
			else
				cur++;
		}
		endTime = time(NULL);
		printf("\nused time:%ld ms\n", endTime - startTime);
	}
	free(a);
	return 0;
}
