----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date:    22:10:48 07/22/2016 
-- Design Name: 
-- Module Name:    FetchInstr - Behavioral 
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
use IEEE.STD_LOGIC_UNSIGNED.ALL;
use IEEE.STD_LOGIC_ARITH.ALL;

-- Uncomment the following library declaration if using
-- arithmetic functions with Signed or Unsigned values
--use IEEE.NUMERIC_STD.ALL;

-- Uncomment the following library declaration if instantiating
-- any Xilinx primitives in this code.
--library UNISIM;
--use UNISIM.VComponents.all;



--取指令模块应当已经正常工作
entity FetchInstr is
	port(	cs:in std_logic;
			cs_alu:in std_logic;
			cs_writ:in std_logic;
			reset:in std_logic;
			pc_update:in std_logic;
			pc_rewrite:in std_logic_vector(15 downto 0);
			ir_in:in std_logic_vector(15 downto 0);
			pc_out:out std_logic_vector(15 downto 0);
			ir_out:out std_logic_vector(15 downto 0);
			if_irread:out std_logic
			);
end FetchInstr;

architecture Behavioral of FetchInstr is
signal pc:std_logic_vector(15 downto 0);
signal ir:std_logic_vector(15 downto 0);
begin

--	ir_out<=ir;
--	pc_out<=pc;--何时输出？当需要时进行输出
	
	
	ir_out<=ir;
	pc_out<=pc;
	
	process(reset,cs,cs_alu,pc_update,pc_rewrite)--更改pc正确
	begin
		if reset='1' then
			pc<=(others=>'0');
		elsif cs='0' and pc_update='1' then
			pc<=pc_rewrite;
		elsif cs_alu='1' and cs_alu'event then
			pc<=pc+1;
		end if;
	end process;
	
	process(cs,reset,ir_in,pc)--控制信号输出，在reset，cs协同下工作
	begin
		if reset='1' then
			if_irread<='0';
			ir<=(others=>'0');
		elsif cs='0' then
			if_irread<='0';
		else
			if_irread<='1';
			ir<=ir_in;
		end if;
	end process;
	
	
end Behavioral;


