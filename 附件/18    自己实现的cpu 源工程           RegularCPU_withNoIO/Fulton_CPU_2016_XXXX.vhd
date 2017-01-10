----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date:    12:51:04 07/24/2016 
-- Design Name: 
-- Module Name:    Fulton_CPU_2016_XXXX - Behavioral 
-- Project Name: 
-- Target Devices: 
-- Tool versions: 
-- Description: 
--
-- Dependencies: 
--
-- Revision: 
-- Revision 0.01 - File Created
-- Additional Comments: 
--
----------------------------------------------------------------------------------
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

-- Uncomment the following library declaration if using
-- arithmetic functions with Signed or Unsigned values
--use IEEE.NUMERIC_STD.ALL;

-- Uncomment the following library declaration if instantiating
-- any Xilinx primitives in this code.
--library UNISIM;
--use UNISIM.VComponents.all;

entity Fulton_CPU_2016_XXXX is
	port(clk,reset:in std_logic;
			fakeIOdatain:in std_logic_vector(7 downto 0);
			fakeIOdataout:out std_logic_vector(7 downto 0);
			maddrbus:out std_logic_vector(15 downto 0);
			mdatabus:inout std_logic_vector(15 downto 0);
			nMREQ,nRD,nWR,nBHE,nBLE:out std_logic
	);
	
end Fulton_CPU_2016_XXXX; 

architecture Behavioral of Fulton_CPU_2016_XXXX is
		
	
    COMPONENT ClockManager --与定义相同
    PORT(
         clk : IN  std_logic;
         reset : IN  std_logic;
			resetall : OUT  std_logic;
         t1 : OUT  std_logic;
         t2 : OUT  std_logic;
         t3 : OUT  std_logic;
         t4 : OUT  std_logic
        );
    END COMPONENT;

	 COMPONENT FetchInstr --与定义相同 & connection checked
    PORT(
         cs : IN  std_logic;
			cs_alu:in std_logic;
			cs_writ:in std_logic;
			reset:in std_logic;
         pc_update : IN  std_logic;--pc_update
         pc_rewrite : IN  std_logic_vector(15 downto 0); --pc_up_data
         ir_in : IN  std_logic_vector(15 downto 0);--ir_in
			pc_out:OUT std_logic_vector(15 downto 0);--pc_out_fetc_memo
         ir_out : OUT  std_logic_vector(15 downto 0);--ir_fetc_alu,
         if_irread : OUT  std_logic--if_irread_fetc_memo
        );
    END COMPONENT;
		
	 COMPONENT ALU --与定义相同 & connection checked
    PORT(
         cs : IN  std_logic;	
			cs_stor:IN std_logic;
			cs_writ : IN  std_logic;
         ir_in : IN  std_logic_vector(15 downto 0);--ir_fetc_alu,
			reset:in std_logic;
         reg_update : IN  std_logic;--reg_update_writ_alu
         reg_up_data : IN  std_logic_vector(7 downto 0);--reg_up_data_writ_alu
         ctrl_ifwrite : OUT  std_logic;
         ctrl_ifpc : OUT  std_logic;
         ctrl_ifextern : OUT  std_logic;
         ctrl_ifio : OUT  std_logic;
         ctrl_ifread : OUT  std_logic;--	ctrl_ifwrite_alu_writ,ctrl_ifpc_alu_writ,
	--	ctrl_ifextern_alu_stor,ctrl_ifio_alu_stor,ctrl_ifread_alu_stor ,
         m_addr : OUT  std_logic_vector(15 downto 0);--m_addr_alu_memo
         m_data : OUT  std_logic_vector(7 downto 0);--m_data_alu_memo
         alu_out : OUT  std_logic_vector(15 downto 0)--alu_out_alu_stor
        );
    END COMPONENT;	

	 COMPONENT StorageManager --checked & connection checked
    PORT(
         cs : IN  std_logic;
			cs_alu:in std_logic;
			cs_writ:in std_logic;
			reset:in std_logic;
         res_in : IN  std_logic_vector(15 downto 0);--alu_out_alu_stor
         m_datain : IN  std_logic_vector(7 downto 0);--m_datain_memo_stor
         if_extern : IN  std_logic;
         if_io : IN  std_logic;
         if_read : IN  std_logic;--ctrl_ifextern_alu_stor,ctrl_ifio_alu_stor,ctrl_ifread_alu_stor,
			iord,iowr:out std_logic;--iord_stor_memo,iowr_stor_memo
         sta : OUT  std_logic;
         lda : OUT  std_logic;--sta_stor_memo,lda_stor_memo
         data_out : OUT  std_logic_vector(15 downto 0)--data_out_stor_writ
        );
    END COMPONENT;
	 	
		
	 
    COMPONENT WriteBack --checked &connection checked
    PORT(
         cs : IN  std_logic;
			cs_alu:in std_logic;
         data_in : IN  std_logic_vector(15 downto 0);--data_out_stor_writ
			reset:in std_logic;
         if_write : IN  std_logic;
         if_pc : IN  std_logic;--ctrl_ifwrite_alu_writ,ctrl_ifpc_alu_writ
         pc_update : OUT  std_logic;--pc_update
         pc_out : OUT  std_logic_vector(15 downto 0);--pc_up_data
         reg_update : OUT  std_logic;--reg_update_writ_alu
         reg_out : OUT  std_logic_vector(7 downto 0)--reg_up_data_writ_alu
        );
    END COMPONENT;
	 
	 COMPONENT MemoryAccessControl --checked and revised,and connection checked
    PORT(
			cs_fetc,reset:in std_logic;
			cs_stor:in std_logic;
         if_irreadin: IN  std_logic;--if_irread_fetc_memo
         sta_in : IN  std_logic;
         lda_in : IN  std_logic;--sta_stor_memo, lda_stor_memo
			iord_in,iowr_in:IN std_logic;--iord_stor_memo,iowr_stor_memo
         pc_in : IN  std_logic_vector(15 downto 0);--	pc_out_fetc_memo
         aluaddr_in : IN  std_logic_vector(15 downto 0);
         aludata_in : IN  std_logic_vector(7 downto 0);--m_addr_alu_memo, m_data_alu_memo,
			fakeIOdatain:in std_logic_vector(7 downto 0);--fakeIOdatain
			fakeIOdataout:out std_logic_vector(7 downto 0);--fakeIOdataout
         storage_dataout : OUT  std_logic_vector(7 downto 0);--m_datain_memo_stor
         m_cs : OUT  std_logic;
         m_rd : OUT  std_logic;
         m_wr : OUT  std_logic;
         m_bh : OUT  std_logic;
         m_bl : OUT  std_logic;--nMREQ,nRD,nWR,nBHE,nBLE,
         m_addr : OUT  std_logic_vector(15 downto 0);--maddrbus
         m_databus : INOUT  std_logic_vector(15 downto 0);--mdatabus
         ir_readout : OUT  std_logic_vector(15 downto 0)--ir_in
        );
    END COMPONENT;
	 
	 ---------------innner signals------------------------
	 signal cs_fetc,cs_alu,cs_stor,cs_writ:std_logic;
	 signal pc_update:std_logic;
	 signal pc_up_data:std_logic_vector(15 downto 0);
	  signal pc_out_fetc_memo:std_logic_vector(15 downto 0);
	 signal ir_in:std_logic_vector(15 downto 0);
	 
	 signal ir_fetc_alu:std_logic_vector(15 downto 0);
	 signal if_irread_fetc_memo:std_logic;
	 
	 
	 signal reg_update_writ_alu:std_logic;
	signal reg_up_data_writ_alu:std_logic_vector(7 downto 0);
	signal ctrl_ifwrite_alu_writ :  std_logic;
	signal ctrl_ifpc_alu_writ :  std_logic;
	signal ctrl_ifextern_alu_stor :  std_logic;
	signal ctrl_ifio_alu_stor :  std_logic;
	signal ctrl_ifread_alu_stor :  std_logic;
	signal m_addr_alu_memo: std_logic_vector(15 downto 0);
	signal m_data_alu_memo: std_logic_vector(7 downto 0);
	signal alu_out_alu_stor: std_logic_vector(15 downto 0);
	
	signal  m_datain_memo_stor :std_logic_vector(7 downto 0);
	signal  sta_stor_memo : std_logic;
	signal  lda_stor_memo : std_logic;
	signal  data_out_stor_writ : std_logic_vector(15 downto 0);
	
	signal iord_stor_memo,iowr_stor_memo:std_logic;
	signal resetall:std_logic;
	
	-----------缓冲器------------
	
	 
		 
begin

	
	CLKM_PART:ClockManager PORT MAP(
		clk,
		reset,
		resetall,
		cs_fetc,cs_alu,cs_stor,cs_writ
	);
	FETC_PART:FetchInstr PORT MAP(
		cs_fetc,
		cs_alu,
		cs_writ,
		resetall,
		pc_update,pc_up_data,
		ir_in,
		pc_out_fetc_memo,
		ir_fetc_alu,
		if_irread_fetc_memo
	);
	ALU_PART:ALU PORT MAP(
		cs_alu,
		cs_stor,
		cs_writ,
		ir_fetc_alu,
		resetall,
		reg_update_writ_alu,	reg_up_data_writ_alu,
		ctrl_ifwrite_alu_writ,ctrl_ifpc_alu_writ,
		ctrl_ifextern_alu_stor,ctrl_ifio_alu_stor,ctrl_ifread_alu_stor ,
		m_addr_alu_memo,
		m_data_alu_memo,
		alu_out_alu_stor
	);

	STOR_PART:StorageManager PORT MAP(
		cs_stor,
		cs_alu,
		cs_writ,
		resetall,
		alu_out_alu_stor,
		m_datain_memo_stor,
		ctrl_ifextern_alu_stor,ctrl_ifio_alu_stor,ctrl_ifread_alu_stor,
		iord_stor_memo,iowr_stor_memo,
		sta_stor_memo,lda_stor_memo,
		data_out_stor_writ
	);
	
	
	WRIT_PART:WriteBack PORT MAP(
		cs_writ,
		cs_alu,
		data_out_stor_writ,
		resetall,
		ctrl_ifwrite_alu_writ,ctrl_ifpc_alu_writ,
		pc_update,
		pc_up_data,
		reg_update_writ_alu,
		reg_up_data_writ_alu
	);
	 
	MEMO_PART:MemoryAccessControl PORT MAP(
		cs_fetc,resetall,cs_stor,
		if_irread_fetc_memo,
		sta_stor_memo, lda_stor_memo,
		iord_stor_memo,iowr_stor_memo,
		pc_out_fetc_memo,
		m_addr_alu_memo, m_data_alu_memo,
		fakeIOdatain,
		fakeIOdataout,
		m_datain_memo_stor,
		nMREQ,nRD,nWR,nBHE,nBLE,
		maddrbus,mdatabus,
		ir_in
	);
	

end Behavioral;

