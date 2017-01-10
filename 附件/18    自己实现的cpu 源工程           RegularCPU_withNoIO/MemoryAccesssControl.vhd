----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date:    11:04:04 07/24/2016 
-- Design Name: 
-- Module Name:    MemoryAccesssControl - Behavioral 
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

entity MemoryAccessControl is
	port(
		cs_fetc,reset,cs_stor:in std_logic;
		if_irreadin,sta_in,lda_in:in std_logic;
		iord_in,iowr_in:in std_logic;
		pc_in:in std_logic_vector(15 downto 0);
		aluaddr_in:in std_logic_vector(15 downto 0);
		aludata_in:in std_logic_vector(7 downto 0);
		fakeIOdatain:in std_logic_vector(7 downto 0);
		fakeIOdataout:out std_logic_vector(7 downto 0);
		
		storage_dataout:out std_logic_vector(7 downto 0);
		m_cs,m_rd,m_wr,m_bh,m_bl:out std_logic;
		m_addr:out std_logic_vector(15 downto 0);
		m_databus:inout std_logic_vector(15 downto 0);
		ir_readout:out std_logic_vector(15 downto 0)
		);
		
        

end MemoryAccessControl;

architecture Behavioral of MemoryAccessControl is
signal marFromAlu:std_logic_vector(15 downto 0);
signal mdrFromAlu:std_logic_vector(7 downto 0);
signal dataToStor:std_logic_vector(7 downto 0);
begin
	
		marFromAlu<=aluaddr_in;
		mdrFromAlu<=aludata_in;
		storage_dataout<=dataToStor;
	
	
	---访存控制器与任何部件同步工作
	process(reset,cs_fetc,if_irreadin,pc_in,cs_stor,sta_in,lda_in,iowr_in,iord_in,fakeIOdatain,m_databus)--同步工作
	begin
		if reset='1' then
				m_cs<='1';--高电平未选中
				m_rd<='1';
				m_wr<='1';
				m_bh<='1';
				m_bl<='1';
				m_databus<="ZZZZZZZZZZZZZZZZ";
		elsif cs_fetc='1' and if_irreadin='1' then
				m_cs<='0';m_rd<='0';m_bh<='0';m_bl<='0';m_wr<='1';
				m_addr<=pc_in;
				m_databus<="ZZZZZZZZZZZZZZZZ";
				ir_readout<=m_databus; --可以同步读出而不必使用寄存器
		elsif cs_stor='1' then
			if lda_in='1' then
				m_cs<='0';m_rd<='0';m_bl<='0';m_wr<='1';m_bh<='1';
				m_addr<=marFromAlu;
				m_databus<="ZZZZZZZZZZZZZZZZ";
				dataToStor<=m_databus(7 downto 0);
			elsif sta_in='1' then
				m_cs<='0';m_rd<='1';m_bl<='0';m_wr<='0';m_bh<='1';
				m_addr<=marFromAlu;
				m_databus(7 downto 0)<=mdrFromAlu;
			elsif iord_in='1' then
				m_cs<='1';m_rd<='1';m_bl<='1';m_wr<='1';m_bh<='1';
				dataToStor<=fakeIOdatain;
				m_databus<="ZZZZZZZZZZZZZZZZ";
			elsif iowr_in='1' then
				m_cs<='1';m_rd<='1';m_bl<='1';m_wr<='1';m_bh<='1';
				fakeIOdataout<=mdrFromAlu;
				m_databus<="ZZZZZZZZZZZZZZZZ";
			else
				m_cs<='1';m_rd<='1';m_bl<='1';m_wr<='1';m_bh<='1';
				m_databus<="ZZZZZZZZZZZZZZZZ";
			end if;
		else
				m_cs<='1';m_rd<='1';m_bl<='1';m_wr<='1';m_bh<='1';
		end if;
	end process;

end Behavioral;

