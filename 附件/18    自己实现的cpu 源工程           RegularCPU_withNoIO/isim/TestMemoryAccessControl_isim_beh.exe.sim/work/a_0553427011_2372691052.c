/**********************************************************************/
/*   ____  ____                                                       */
/*  /   /\/   /                                                       */
/* /___/  \  /                                                        */
/* \   \   \/                                                       */
/*  \   \        Copyright (c) 2003-2009 Xilinx, Inc.                */
/*  /   /          All Right Reserved.                                 */
/* /---/   /\                                                         */
/* \   \  /  \                                                      */
/*  \___\/\___\                                                    */
/***********************************************************************/

/* This file is designed for use with ISim build 0x7708f090 */

#define XSI_HIDE_SYMBOL_SPEC true
#include "xsi.h"
#include <memory.h>
#ifdef __GNUC__
#include <stdlib.h>
#else
#include <malloc.h>
#define alloca _alloca
#endif
static const char *ng0 = "H:/RegularCPU_withNoIO/TestMemoryAccessControl.vhd";



static void work_a_0553427011_2372691052_p_0(char *t0)
{
    char *t1;
    char *t2;
    char *t3;
    char *t4;
    char *t5;
    char *t6;
    int64 t7;
    char *t8;
    char *t9;
    int64 t10;

LAB0:    t1 = (t0 + 5672U);
    t2 = *((char **)t1);
    if (t2 == 0)
        goto LAB2;

LAB3:    goto *t2;

LAB2:    xsi_set_current_line(137, ng0);
    t2 = (t0 + 6056);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)3;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(138, ng0);
    t7 = (100 * 1000LL);
    t2 = (t0 + 5480);
    xsi_process_wait(t2, t7);

LAB6:    *((char **)t1) = &&LAB7;

LAB1:    return;
LAB4:    xsi_set_current_line(140, ng0);
    t2 = (t0 + 6056);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)2;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(141, ng0);
    t2 = (t0 + 6120);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)3;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(142, ng0);
    t2 = (t0 + 6184);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)3;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(143, ng0);
    t2 = (t0 + 10352);
    t4 = (t0 + 6248);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    t8 = (t6 + 56U);
    t9 = *((char **)t8);
    memcpy(t9, t2, 16U);
    xsi_driver_first_trans_fast(t4);
    xsi_set_current_line(144, ng0);
    t7 = (1 * 1000LL);
    t2 = (t0 + 5480);
    xsi_process_wait(t2, t7);

LAB10:    *((char **)t1) = &&LAB11;
    goto LAB1;

LAB5:    goto LAB4;

LAB7:    goto LAB5;

LAB8:    xsi_set_current_line(145, ng0);
    t2 = (t0 + 10368);
    t4 = (t0 + 6312);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    t8 = (t6 + 56U);
    t9 = *((char **)t8);
    memcpy(t9, t2, 16U);
    xsi_driver_first_trans_fast(t4);
    xsi_set_current_line(146, ng0);
    t2 = (t0 + 4688U);
    t3 = *((char **)t2);
    t7 = *((int64 *)t3);
    t10 = (t7 * 10);
    t2 = (t0 + 5480);
    xsi_process_wait(t2, t10);

LAB14:    *((char **)t1) = &&LAB15;
    goto LAB1;

LAB9:    goto LAB8;

LAB11:    goto LAB9;

LAB12:    xsi_set_current_line(147, ng0);
    t2 = (t0 + 6120);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)2;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(148, ng0);
    t2 = (t0 + 6376);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)3;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(149, ng0);
    t2 = (t0 + 10384);
    t4 = (t0 + 6440);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    t8 = (t6 + 56U);
    t9 = *((char **)t8);
    memcpy(t9, t2, 16U);
    xsi_driver_first_trans_fast(t4);
    xsi_set_current_line(150, ng0);
    t2 = (t0 + 10400);
    t4 = (t0 + 6504);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    t8 = (t6 + 56U);
    t9 = *((char **)t8);
    memcpy(t9, t2, 8U);
    xsi_driver_first_trans_fast(t4);
    xsi_set_current_line(151, ng0);
    t2 = (t0 + 6568);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)3;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(152, ng0);
    t7 = (1 * 1000LL);
    t2 = (t0 + 5480);
    xsi_process_wait(t2, t7);

LAB18:    *((char **)t1) = &&LAB19;
    goto LAB1;

LAB13:    goto LAB12;

LAB15:    goto LAB13;

LAB16:    xsi_set_current_line(153, ng0);
    t2 = (t0 + 10408);
    t4 = (t0 + 6312);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    t8 = (t6 + 56U);
    t9 = *((char **)t8);
    memcpy(t9, t2, 16U);
    xsi_driver_first_trans_fast(t4);
    xsi_set_current_line(155, ng0);
    t2 = (t0 + 4688U);
    t3 = *((char **)t2);
    t7 = *((int64 *)t3);
    t10 = (t7 * 10);
    t2 = (t0 + 5480);
    xsi_process_wait(t2, t10);

LAB22:    *((char **)t1) = &&LAB23;
    goto LAB1;

LAB17:    goto LAB16;

LAB19:    goto LAB17;

LAB20:    xsi_set_current_line(156, ng0);
    t2 = (t0 + 6376);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)2;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(157, ng0);
    t2 = (t0 + 4688U);
    t3 = *((char **)t2);
    t7 = *((int64 *)t3);
    t10 = (t7 * 10);
    t2 = (t0 + 5480);
    xsi_process_wait(t2, t10);

LAB26:    *((char **)t1) = &&LAB27;
    goto LAB1;

LAB21:    goto LAB20;

LAB23:    goto LAB21;

LAB24:    xsi_set_current_line(158, ng0);
    t2 = (t0 + 6376);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)3;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(159, ng0);
    t2 = (t0 + 6632);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)3;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(159, ng0);
    t2 = (t0 + 6568);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)2;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(160, ng0);
    t2 = (t0 + 10424);
    t4 = (t0 + 6440);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    t8 = (t6 + 56U);
    t9 = *((char **)t8);
    memcpy(t9, t2, 16U);
    xsi_driver_first_trans_fast(t4);
    xsi_set_current_line(161, ng0);
    t2 = (t0 + 10440);
    t4 = (t0 + 6504);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    t8 = (t6 + 56U);
    t9 = *((char **)t8);
    memcpy(t9, t2, 8U);
    xsi_driver_first_trans_fast(t4);
    xsi_set_current_line(162, ng0);
    t2 = (t0 + 10448);
    t4 = (t0 + 6312);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    t8 = (t6 + 56U);
    t9 = *((char **)t8);
    memcpy(t9, t2, 16U);
    xsi_driver_first_trans_fast(t4);
    xsi_set_current_line(165, ng0);
    t2 = (t0 + 4688U);
    t3 = *((char **)t2);
    t7 = *((int64 *)t3);
    t10 = (t7 * 10);
    t2 = (t0 + 5480);
    xsi_process_wait(t2, t10);

LAB30:    *((char **)t1) = &&LAB31;
    goto LAB1;

LAB25:    goto LAB24;

LAB27:    goto LAB25;

LAB28:    xsi_set_current_line(166, ng0);
    t2 = (t0 + 6376);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)2;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(167, ng0);
    t2 = (t0 + 4688U);
    t3 = *((char **)t2);
    t7 = *((int64 *)t3);
    t10 = (t7 * 10);
    t2 = (t0 + 5480);
    xsi_process_wait(t2, t10);

LAB34:    *((char **)t1) = &&LAB35;
    goto LAB1;

LAB29:    goto LAB28;

LAB31:    goto LAB29;

LAB32:    xsi_set_current_line(168, ng0);
    t2 = (t0 + 6376);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)3;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(169, ng0);
    t2 = (t0 + 6632);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)2;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(170, ng0);
    t2 = (t0 + 6696);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)3;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(171, ng0);
    t7 = (1 * 1000LL);
    t2 = (t0 + 5480);
    xsi_process_wait(t2, t7);

LAB38:    *((char **)t1) = &&LAB39;
    goto LAB1;

LAB33:    goto LAB32;

LAB35:    goto LAB33;

LAB36:    xsi_set_current_line(172, ng0);
    t2 = (t0 + 10464);
    t4 = (t0 + 6760);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    t8 = (t6 + 56U);
    t9 = *((char **)t8);
    memcpy(t9, t2, 8U);
    xsi_driver_first_trans_fast(t4);
    xsi_set_current_line(176, ng0);
    t2 = (t0 + 4688U);
    t3 = *((char **)t2);
    t7 = *((int64 *)t3);
    t10 = (t7 * 10);
    t2 = (t0 + 5480);
    xsi_process_wait(t2, t10);

LAB42:    *((char **)t1) = &&LAB43;
    goto LAB1;

LAB37:    goto LAB36;

LAB39:    goto LAB37;

LAB40:    xsi_set_current_line(177, ng0);
    t2 = (t0 + 6376);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)2;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(178, ng0);
    t2 = (t0 + 4688U);
    t3 = *((char **)t2);
    t7 = *((int64 *)t3);
    t10 = (t7 * 10);
    t2 = (t0 + 5480);
    xsi_process_wait(t2, t10);

LAB46:    *((char **)t1) = &&LAB47;
    goto LAB1;

LAB41:    goto LAB40;

LAB43:    goto LAB41;

LAB44:    xsi_set_current_line(179, ng0);
    t2 = (t0 + 6376);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)3;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(180, ng0);
    t2 = (t0 + 6824);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)3;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(180, ng0);
    t2 = (t0 + 6696);
    t3 = (t2 + 56U);
    t4 = *((char **)t3);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    *((unsigned char *)t6) = (unsigned char)2;
    xsi_driver_first_trans_fast(t2);
    xsi_set_current_line(181, ng0);
    t2 = (t0 + 10472);
    t4 = (t0 + 6504);
    t5 = (t4 + 56U);
    t6 = *((char **)t5);
    t8 = (t6 + 56U);
    t9 = *((char **)t8);
    memcpy(t9, t2, 8U);
    xsi_driver_first_trans_fast(t4);
    xsi_set_current_line(182, ng0);

LAB50:    *((char **)t1) = &&LAB51;
    goto LAB1;

LAB45:    goto LAB44;

LAB47:    goto LAB45;

LAB48:    goto LAB2;

LAB49:    goto LAB48;

LAB51:    goto LAB49;

}


extern void work_a_0553427011_2372691052_init()
{
	static char *pe[] = {(void *)work_a_0553427011_2372691052_p_0};
	xsi_register_didat("work_a_0553427011_2372691052", "isim/TestMemoryAccessControl_isim_beh.exe.sim/work/a_0553427011_2372691052.didat");
	xsi_register_executes(pe);
}
